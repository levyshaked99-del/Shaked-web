import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}
