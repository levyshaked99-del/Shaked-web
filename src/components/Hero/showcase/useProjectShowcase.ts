import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { HERO_PROJECT_COUNT } from './heroProjectsData'

const SWIPE_THRESHOLD = 48

export function useProjectShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((next: number, nextDirection: 1 | -1 = 1) => {
    setDirection(nextDirection)
    setIndex(((next % HERO_PROJECT_COUNT) + HERO_PROJECT_COUNT) % HERO_PROJECT_COUNT)
  }, [])

  const goNext = useCallback(() => {
    goTo(index + 1, 1)
  }, [goTo, index])

  const goPrev = useCallback(() => {
    goTo(index - 1, -1)
  }, [goTo, index])

  const onTouchStart = useCallback((clientX: number) => {
    touchStartX.current = clientX
  }, [])

  const onTouchEnd = useCallback(
    (clientX: number) => {
      if (touchStartX.current === null) return
      const delta = clientX - touchStartX.current
      touchStartX.current = null
      if (Math.abs(delta) < SWIPE_THRESHOLD) return
      if (delta < 0) goNext()
      else goPrev()
    },
    [goNext, goPrev],
  )

  return {
    index,
    direction,
    goTo,
    prefersReducedMotion,
    onTouchStart,
    onTouchEnd,
  }
}
