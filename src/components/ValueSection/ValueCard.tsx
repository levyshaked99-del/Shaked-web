import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { STORY, VALUE_STORY } from '../../design/storyColors'
import { cardShadow, EASE_PREMIUM } from '../../motion'
import { VALUE_ILLUSTRATIONS } from './ValueIllustrations'
import type { ValueCardData } from './valueCardsData'

interface ValueCardProps {
  card: ValueCardData
  index: number
  inView: boolean
}

export function ValueCard({ card, index, inView }: ValueCardProps) {
  const [hovered, setHovered] = useState(false)
  const Illustration = VALUE_ILLUSTRATIONS[card.id]
  const story = VALUE_STORY[card.id]

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallaxX = useSpring(mx, { stiffness: 200, damping: 22 })
  const parallaxY = useSpring(my, { stiffness: 200, damping: 22 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!hovered) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 8)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 6)
  }

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={
        inView
          ? {
              opacity: 1,
              y: hovered ? -6 : 0,
              filter: 'blur(0px)',
              boxShadow: hovered ? cardShadow.hover : cardShadow.rest,
            }
          : { opacity: 0, y: 36, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.55, delay: 0.12 + index * 0.1, ease: EASE_PREMIUM }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(false)
        mx.set(0)
        my.set(0)
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: STORY[story].muted, opacity: hovered ? 0.8 : 0.45 }}
        aria-hidden
      />

      <div className="relative overflow-hidden border-b border-black/[0.04] bg-gradient-to-b from-[#f8f8f8]/90 to-white/95">
        <motion.div
          className="relative flex h-[200px] items-center justify-center px-6 pt-4 md:h-[220px]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.div
            className="h-full w-full max-w-[300px]"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          >
            <Illustration active={hovered} />
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col bg-white/80 px-8 pb-10 pt-6 md:px-10 md:pb-12 md:pt-7">
        <h3 className="text-[1.35rem] font-bold leading-snug tracking-tight text-text md:text-[1.45rem]">
          {card.title}
        </h3>
        <div className="mt-5 space-y-1.5">
          {card.description.map((line) => (
            <p key={line} className="text-[14px] leading-[1.75] text-text/52 md:text-[15px]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
