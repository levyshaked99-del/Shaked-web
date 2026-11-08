import { motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import type { WhoItsForAudience } from './whoItsForData'

interface WhoItsForCardProps {
  audience: WhoItsForAudience
  index: number
  inView: boolean
  reducedMotion: boolean
}

export function WhoItsForCard({ audience, index, inView, reducedMotion }: WhoItsForCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-depth-sm transition-colors duration-300 hover:border-story-purple/15"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: reducedMotion ? 0 : hovered ? -4 : 0,
              boxShadow: hovered
                ? '0 12px 40px -12px rgba(0,0,0,0.12), 0 0 48px -24px rgba(124,58,237,0.08)'
                : undefined,
            }
          : reducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
      }
      transition={{
        opacity: { duration: 0.6, delay: reducedMotion ? 0 : 0.08 + index * 0.1, ease: EASE_PREMIUM },
        y: { duration: 0.45, ease: EASE_PREMIUM },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={audience.imageSrc}
          alt={audience.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.18] via-transparent to-transparent opacity-80"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <h3 className="text-base font-bold tracking-tight text-text md:text-[1.0625rem]">
          {audience.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text/55">{audience.description}</p>
      </div>
    </motion.article>
  )
}
