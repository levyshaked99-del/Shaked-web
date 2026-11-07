import { useEffect, useState } from 'react'

/** True while the user is scrolling and briefly after scroll stops. */
export function useScrollActivity(settleMs = 140) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let timer = 0

    const onScroll = () => {
      setActive(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setActive(false), settleMs)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [settleMs])

  return active
}
