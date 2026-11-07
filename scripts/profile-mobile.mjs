/**
 * Mobile performance profile for production homepage.
 * Simulates iPhone 13 + 4x CPU throttle + Fast 4G (closer to real mobile than desktop Lighthouse).
 */
import { chromium, devices } from 'playwright'

const URL = process.env.PROFILE_URL || 'http://127.0.0.1:4175/'

async function profileScrollFps(page) {
  return page.evaluate(async () => {
    const samples = []
    let last = performance.now()
    let frames = 0
    await new Promise((resolve) => {
      const deadline = performance.now() + 2000
      const tick = (now) => {
        frames++
        if (now - last >= 1000) {
          samples.push(frames)
          frames = 0
          last = now
        }
        if (performance.now() < deadline) {
          requestAnimationFrame(tick)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(tick)
      window.scrollBy({ top: 800, behavior: 'auto' })
    })
    return { scrollFpsSamples: samples, avgScrollFps: samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : 0 }
  })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    locale: 'he-IL',
  })
  const page = await context.newPage()
  const cdp = await context.newCDPSession(page)

  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: 'cellular4g',
  })

  await page.addInitScript(() => {
    window.__longTasks = []
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__longTasks.push({
          name: entry.name,
          start: entry.startTime,
          duration: entry.duration,
        })
      }
    })
    obs.observe({ type: 'longtask', buffered: true })
  })

  await cdp.send('Performance.enable', {})

  const wallStart = Date.now()
  await page.goto(`${URL}?v=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)

  const paintAndNav = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    const paints = performance.getEntriesByType('paint')
    const fcp = paints.find((p) => p.name === 'first-contentful-paint')
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
    const lcp = lcpEntries[lcpEntries.length - 1]
    const resources = performance.getEntriesByType('resource')
    const scripts = resources.filter((r) => r.initiatorType === 'script' || r.name.includes('.js'))
    const longTasks = window.__longTasks || []
    const ttiEstimate = nav
      ? Math.max(
          nav.domContentLoadedEventEnd,
          ...(longTasks.map((t) => t.start + t.duration)),
        )
      : null

    return {
      ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : null,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      lcp: lcp ? Math.round(lcp.startTime) : null,
      ttiEstimate: ttiEstimate ? Math.round(ttiEstimate) : null,
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEventEnd: nav ? Math.round(nav.loadEventEnd) : null,
      longTasks: longTasks.sort((a, b) => b.duration - a.duration).slice(0, 20),
      longTaskCount: longTasks.length,
      longTaskTotalMs: Math.round(longTasks.reduce((s, t) => s + t.duration, 0)),
      scriptResources: scripts.map((r) => ({
        name: r.name.split('/').pop(),
        transferKb: Math.round((r.transferSize || 0) / 1024),
        durationMs: Math.round(r.duration),
        startMs: Math.round(r.startTime),
      })),
      totalScriptKb: Math.round(scripts.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
      growthLoadedAtStartup: scripts.some((r) => r.name.includes('section-growth')),
      heroJourneyLoadedAtStartup: scripts.some((r) => r.name.includes('hero-journey')),
    }
  })

  const cdpMetrics = await cdp.send('Performance.getMetrics', {})
  const scrollFps = await profileScrollFps(page)

  const heroVisible = await page.locator('.hero-build-showcase').isVisible().catch(() => false)
  const journeyLoaded = await page.locator('[dir="ltr"]').count()

  await browser.close()

  const result = {
    profile: 'iPhone 13 + 4x CPU + 4G throttling',
    wallClockToNetworkIdleMs: Date.now() - wallStart,
    ...paintAndNav,
    scrollFps,
    heroShowcaseVisible: heroVisible,
    cdpMetrics: Object.fromEntries(
      cdpMetrics.metrics.filter((m) =>
        ['Timestamp', 'Documents', 'Frames', 'JSEventListeners', 'LayoutCount', 'RecalcStyleCount', 'JSHeapUsedSize'].includes(m.name),
      ).map((m) => [m.name, m.value]),
    ),
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
