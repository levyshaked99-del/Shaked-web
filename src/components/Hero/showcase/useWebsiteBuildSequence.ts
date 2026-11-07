import { useCallback, useEffect, useRef, useState } from 'react'

export const BUILD_STAGES = [
  { id: 0, label: 'מבנה' },
  { id: 1, label: 'עיצוב' },
  { id: 2, label: 'אתר מוכן' },
] as const

export type BuildStageIndex = 0 | 1 | 2

const HOLD_MS: Record<BuildStageIndex, { desktop: number; mobile: number }> = {
  0: { desktop: 3500, mobile: 2500 },
  1: { desktop: 4000, mobile: 2500 },
  2: { desktop: 5500, mobile: 3000 },
}

export function getTransitionMs(isMobile: boolean) {
  return isMobile ? 600 : 1100
}

export function getLoopCrossfadeMs(isMobile: boolean) {
  return isMobile ? 900 : 1350
}

const MANUAL_HOLD_MS = 2500

export function useWebsiteBuildSequence(options: {
  prefersReducedMotion: boolean
  isMobile: boolean
  pausedHover: boolean
  pausedFocus: boolean
}) {
  const { prefersReducedMotion, isMobile, pausedHover, pausedFocus } = options

  const [stageIndex, setStageIndex] = useState<BuildStageIndex>(0)
  const [holdUntil, setHoldUntil] = useState(0)
  const [tabHidden, setTabHidden] = useState(false)
  const [isLoopBlending, setIsLoopBlending] = useState(false)
  const [loopBlend, setLoopBlend] = useState(0)
  const mountedRef = useRef(true)
  const loopRafRef = useRef(0)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      cancelAnimationFrame(loopRafRef.current)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setStageIndex(2)
      setIsLoopBlending(false)
      setLoopBlend(0)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (holdUntil <= 0 || Date.now() >= holdUntil) return
    const wait = holdUntil - Date.now()
    const timer = window.setTimeout(() => setHoldUntil(0), wait)
    return () => window.clearTimeout(timer)
  }, [holdUntil])

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.visibilityState === 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const manualHoldActive = holdUntil > 0 && Date.now() < holdUntil

  const paused =
    prefersReducedMotion ||
    pausedHover ||
    pausedFocus ||
    tabHidden ||
    isLoopBlending ||
    manualHoldActive

  const completeLoopBlend = useCallback(() => {
    if (!mountedRef.current) return
    setIsLoopBlending(false)
    setLoopBlend(0)
    setStageIndex(0)
  }, [])

  const startLoopBlend = useCallback(() => {
    if (!mountedRef.current) return
    setIsLoopBlending(true)
    setLoopBlend(0)
    const duration = getLoopCrossfadeMs(isMobile)
    const start = performance.now()

    const tick = (now: number) => {
      if (!mountedRef.current) return
      const t = Math.min(1, (now - start) / duration)
      setLoopBlend(t)
      if (t < 1) {
        loopRafRef.current = requestAnimationFrame(tick)
      } else {
        completeLoopBlend()
      }
    }

    loopRafRef.current = requestAnimationFrame(tick)
  }, [completeLoopBlend, isMobile])

  useEffect(() => {
    if (prefersReducedMotion || paused) return

    const hold = HOLD_MS[stageIndex][isMobile ? 'mobile' : 'desktop']
    const timer = window.setTimeout(() => {
      if (!mountedRef.current) return
      if (stageIndex === 2) {
        startLoopBlend()
      } else {
        setStageIndex((stageIndex + 1) as BuildStageIndex)
      }
    }, hold)

    return () => window.clearTimeout(timer)
  }, [stageIndex, paused, prefersReducedMotion, isMobile, startLoopBlend])

  const goToStage = useCallback((index: BuildStageIndex) => {
    cancelAnimationFrame(loopRafRef.current)
    setIsLoopBlending(false)
    setLoopBlend(0)
    setStageIndex(index)
    setHoldUntil(Date.now() + MANUAL_HOLD_MS)
  }, [])

  const announceLabel = BUILD_STAGES[stageIndex]?.label ?? ''
  const announceText = `שלב ${stageIndex + 1} מתוך 3: ${announceLabel}`

  return {
    stageIndex,
    goToStage,
    isLoopBlending,
    loopBlend,
    announceText,
    transitionMs: getTransitionMs(isMobile),
    prefersReducedMotion,
  }
}
