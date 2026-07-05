import { useCallback, useEffect, useState } from 'react'
import { JOURNEY_STAGES } from './journeyConfig'

export function useJourneyPlayback() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [holdUntil, setHoldUntil] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    setHoldUntil(Date.now() + JOURNEY_STAGES[index].duration + 2500)
  }, [])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % JOURNEY_STAGES.length)
  }, [])

  useEffect(() => {
    if (paused) return

    const now = Date.now()
    if (now < holdUntil) {
      const wait = holdUntil - now
      const timer = setTimeout(() => setHoldUntil(0), wait)
      return () => clearTimeout(timer)
    }

    const duration = JOURNEY_STAGES[activeIndex].duration
    const timer = setTimeout(next, duration)
    return () => clearTimeout(timer)
  }, [activeIndex, paused, holdUntil, next])

  return {
    activeIndex,
    activeStage: JOURNEY_STAGES[activeIndex],
    goTo,
    setPaused,
    totalStages: JOURNEY_STAGES.length,
  }
}
