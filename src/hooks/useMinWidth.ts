import { useEffect, useState } from 'react'

export function useMinWidth(minWidthPx: number) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidthPx}px)`)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [minWidthPx])

  return matches
}
