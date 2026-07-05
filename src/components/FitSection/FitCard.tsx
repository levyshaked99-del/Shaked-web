import { motion } from 'framer-motion'
import { Award, Network, Rocket, TrendingUp, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { FIT_STORY, STORY } from '../../design/storyColors'
import { EASE_PREMIUM } from '../../motion'
import { AnimatedIcon } from '../ui/AnimatedIcon'
import type { FitCardData, FitIconId } from './fitCardsData'

const ICON_MAP: Record<FitIconId, LucideIcon> = {
  rocket: Rocket,
  growth: TrendingUp,
  network: Network,
  badge: Award,
}

interface FitCardProps {
  card: FitCardData
  index: number
  inView: boolean
}

export function FitCard({ card, index, inView }: FitCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICON_MAP[card.icon]
  const story = FIT_STORY[card.id]

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-8 md:p-10"
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={
        inView
          ? {
              opacity: 1,
              y: hovered ? -5 : 0,
              filter: 'blur(0px)',
              boxShadow: hovered
                ? `0 24px 64px -24px rgba(0,0,0,0.14), 0 0 48px -24px ${STORY[story].glow}`
                : '0 8px 32px -16px rgba(0,0,0,0.08)',
            }
          : { opacity: 0, y: 32, filter: 'blur(8px)' }
      }
      transition={{
        opacity: { duration: 0.6, delay: 0.15 + index * 0.12, ease: EASE_PREMIUM },
        filter: { duration: 0.6, delay: 0.15 + index * 0.12, ease: EASE_PREMIUM },
        y: { duration: 0.45, ease: EASE_PREMIUM },
        boxShadow: { duration: 0.45, ease: EASE_PREMIUM },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300"
        style={{
          borderColor: hovered ? `${STORY[story].DEFAULT}26` : 'rgba(0,0,0,0.05)',
          backgroundColor: hovered ? STORY[story].faint : '#fafafa',
        }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
      >
        <AnimatedIcon icon={Icon} active={hovered} size={24} tone={story} />
      </motion.div>

      <h3 className="text-[1.25rem] font-bold leading-snug tracking-tight text-text md:text-[1.35rem]">
        {card.title}
      </h3>

      <div className="mt-5 space-y-1">
        {card.lines.map((line) => (
          <p key={line} className="text-[15px] leading-[1.75] text-text/52">
            {line}
          </p>
        ))}
      </div>
    </motion.article>
  )
}
