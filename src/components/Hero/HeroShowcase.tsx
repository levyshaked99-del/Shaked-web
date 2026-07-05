import { motion, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useMinWidth } from '../../hooks/useMinWidth'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { CardGlow } from '../ui/CardGlow'
import { GlowOrb } from '../ui/GlowOrb'
import { CustomerJourneyAnimation } from './showcase/CustomerJourneyAnimation'

export function HeroShowcase() {
  const [paused, setPaused] = useState(false)
  const isDesktop = useMinWidth(768)
  const { mouseX, mouseY } = useMouseParallax()
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const parallaxX = useTransform(springX, [-1, 1], [-6, 6])
  const parallaxY = useTransform(springY, [-1, 1], [-4, 4])

  return (
    <div className="mx-auto w-full max-w-full overflow-hidden">
      <motion.div
        className="relative mx-auto w-full max-w-[520px] origin-top scale-[0.78] md:scale-100 lg:max-w-[580px]"
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="relative min-w-0"
          style={isDesktop ? { x: parallaxX, y: parallaxY } : undefined}
          aria-hidden
        >
          <CardGlow tone="dual" />
          <GlowOrb tone="violet" size="md" opacity={0.05} className="right-[10%] top-[20%] max-md:opacity-[0.03]" />
          <GlowOrb tone="violet" size="sm" opacity={0.04} className="left-[5%] bottom-[25%] max-md:opacity-[0.025]" />

          <CustomerJourneyAnimation paused={paused} />
        </motion.div>
      </motion.div>
    </div>
  )
}
