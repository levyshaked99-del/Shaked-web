import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { STORY } from '../../design/storyColors'
import type { GrowthOrbitCard } from './websiteGrowthData'

/** Card centers on a circle at 12, 3, 6, 9 o'clock — equal radius from hub center */
const CARD_SLOTS = [
  { top: '14%', left: '50%', x: '-50%', y: '-50%' },
  { top: '50%', left: '86%', x: '-50%', y: '-50%' },
  { top: '86%', left: '50%', x: '-50%', y: '-50%' },
  { top: '50%', left: '14%', x: '-50%', y: '-50%' },
] as const

const TRANSITION = { duration: 0.65, ease: EASE_PREMIUM }

interface GrowthShowcaseVisualProps {
  benefitId: string
  hubLabel: string
  hubSubtitle: string
  cards: GrowthOrbitCard[]
  active: boolean
}

function OrbitCard({
  label,
  icon: Icon,
  index,
}: {
  label: string
  icon: LucideIcon
  index: number
}) {
  const slot = CARD_SLOTS[index]

  return (
    <motion.div
      className="absolute z-10 w-[28%] min-w-[88px] max-w-[120px]"
      style={{ top: slot.top, left: slot.left, x: slot.x, y: slot.y }}
      initial={{ opacity: 0, scale: 0.92, y: index === 0 ? -8 : index === 2 ? 8 : 0 }}
      animate={{ opacity: 1, scale: 1, y: slot.y }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ ...TRANSITION, delay: index * 0.06 }}
    >
      <div className="rounded-2xl border border-black/[0.05] bg-white px-3 py-3 text-center shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] md:rounded-[18px] md:px-3.5 md:py-3.5">
        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.05] bg-secondary/50 md:h-9 md:w-9">
          <Icon size={15} strokeWidth={1.5} className="text-text/55" aria-hidden />
        </div>
        <p className="mt-2.5 text-[11px] font-medium leading-tight text-text/70 md:text-xs">{label}</p>
      </div>
    </motion.div>
  )
}

export function GrowthShowcaseVisual({
  benefitId,
  hubLabel,
  hubSubtitle,
  cards,
  active,
}: GrowthShowcaseVisualProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] md:max-w-[480px] lg:max-w-[520px]">
      <svg
        className="pointer-events-none absolute inset-[10%] h-[80%] w-[80%] overflow-visible"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(17,17,17,0.07)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {active && (
        <motion.div
          className="pointer-events-none absolute inset-[10%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        >
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-story-purple/80 shadow-[0_0_12px_rgba(124,58,237,0.35)]" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={benefitId}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
        >
          {cards.map((card, index) => (
            <OrbitCard key={card.label} label={card.label} icon={card.icon} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-1/2 top-1/2 z-20 flex h-[38%] w-[38%] min-h-[120px] min-w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-story-purple/25 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${benefitId}-hub`}
            className="flex flex-col items-center px-4 text-center"
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM }}
          >
            <span className="text-[clamp(1.35rem,4vw,2rem)] font-extrabold tracking-tight text-text">
              {hubLabel}
            </span>
            <span
              className="mt-1.5 text-[11px] font-medium md:text-xs"
              style={{ color: STORY.purple.DEFAULT }}
            >
              {hubSubtitle}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
