import { type ReactNode, useEffect, useState } from 'react'

interface LazySectionProps {
  children: ReactNode
  minHeight?: string
}

/** Defers mounting children until the user scrolls — never prefetches at startup. */
export function LazySection({ children, minHeight = '480px' }: LazySectionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return

    const reveal = () => setVisible(true)

    // Hash links to below-fold sections should still load target content.
    if (window.location.hash && window.location.hash !== '#hero') {
      reveal()
      return
    }

    const onScroll = () => {
      reveal()
      window.removeEventListener('scroll', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [visible])

  return <div style={{ minHeight: visible ? undefined : minHeight }}>{visible ? children : null}</div>
}
