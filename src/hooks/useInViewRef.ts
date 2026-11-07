import { useEffect, useState, type RefObject } from 'react'

interface InViewOptions {
  once?: boolean
  margin?: string
  amount?: number
}

/** Lightweight IntersectionObserver hook — avoids pulling Framer Motion into hot paths. */
export function useInViewRef<T extends Element>(
  ref: RefObject<T | null>,
  { once = false, margin = '0px', amount = 0 }: InViewOptions = {},
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin, threshold: amount },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, once, margin, amount])

  return inView
}
