import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../motion/easing'
import { BADGE_LABELS, type IncludedBadge } from './includedItemsData'

interface PremiumBadgeProps {
  type: IncludedBadge
  visible?: boolean
  delay?: number
}

const BADGE_STYLES: Record<IncludedBadge, string> = {
  included: 'border-story-blue/20 bg-story-blue-soft text-brand',
  free: 'border-story-green/25 bg-story-green-soft text-story-green',
  recommended: 'border-story-purple/20 bg-story-purple-soft text-story-purple',
  popular: 'border-story-yellow/25 bg-story-yellow-soft text-story-yellow',
}

export function PremiumBadge({ type, visible = true, delay = 0 }: PremiumBadgeProps) {
  return (
    <motion.span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide md:text-[11px] ${BADGE_STYLES[type]}`}
      initial={{ opacity: 0, y: 4 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={{ duration: 0.4, delay, ease: EASE_PREMIUM }}
    >
      {BADGE_LABELS[type]}
    </motion.span>
  )
}
