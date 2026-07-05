import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  enabled?: boolean
}

export function useCountUp({
  end,
  duration = 1800,
  decimals = 0,
  suffix = '',
  prefix = '',
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!enabled || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [enabled, end, duration])

  const formatted =
    prefix +
    (decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()) +
    suffix

  return formatted
}
