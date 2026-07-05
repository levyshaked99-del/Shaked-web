import { useEffect, useState } from 'react'

const DURATION_MS = 18_000

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** Maps global progress (0–1) to a local phase range with easing. */
export function phaseProgress(progress: number, start: number, end: number, ease = easeOutCubic) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return ease((progress - start) / (end - start))
}

export function useCustomerJourneyProgress(paused: boolean) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    let accumulated = 0
    let last = performance.now()

    const tick = (now: number) => {
      if (!paused) {
        accumulated += now - last
        setProgress((accumulated % DURATION_MS) / DURATION_MS)
      }
      last = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  return { progress, durationMs: DURATION_MS, easeInOutCubic, easeOutCubic }
}
