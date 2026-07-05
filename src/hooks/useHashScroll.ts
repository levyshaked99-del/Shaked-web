import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useHashScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash || pathname !== '/') return

    const id = hash.replace('#', '')
    let attempts = 0

    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts++ < 12) {
        window.requestAnimationFrame(scrollToTarget)
      }
    }

    const timer = window.setTimeout(scrollToTarget, 80)
    return () => window.clearTimeout(timer)
  }, [hash, pathname])
}
