import { useEffect, useState } from 'react'
import { useMinWidth } from './useMinWidth'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function detectLowEndDevice() {
  if (typeof navigator === 'undefined') return false

  const cores = navigator.hardwareConcurrency ?? 4
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  const saveData = connection?.saveData === true
  const slowNetwork =
    connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'

  return cores <= 4 || saveData || slowNetwork
}

/** Shared flags for gating expensive visuals and animation loops. */
export function usePerformanceProfile() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isDesktop = useMinWidth(768)
  const isMobile = !isDesktop
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    setIsLowEndDevice(detectLowEndDevice())
  }, [])

  const reduceAnimations = prefersReducedMotion || isMobile
  const enableHeavyEffects = isDesktop && !prefersReducedMotion
  const enableInfiniteAnimations = isDesktop && !prefersReducedMotion && !isLowEndDevice

  const animationFps = prefersReducedMotion
    ? 12
    : isLowEndDevice
      ? 12
      : isMobile
        ? 20
        : 60

  return {
    isMobile,
    isDesktop,
    isLowEndDevice,
    prefersReducedMotion,
    reduceAnimations,
    enableHeavyEffects,
    enableInfiniteAnimations,
    /** Hero journey loop target FPS — lower on mobile saves main-thread work. */
    animationFps,
  }
}
