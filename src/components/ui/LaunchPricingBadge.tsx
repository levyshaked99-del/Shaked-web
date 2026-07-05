import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../motion/easing'

interface LaunchPricingBadgeProps {
  visible?: boolean
  delay?: number
  showSubtext?: boolean
  className?: string
}

export function LaunchPricingBadge({
  visible = true,
  delay = 0,
  showSubtext = false,
  className = '',
}: LaunchPricingBadgeProps) {
  return (
    <motion.div
      className={`inline-flex flex-col items-center gap-1 ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.45, delay, ease: EASE_PREMIUM }}
    >
      <span className="inline-flex items-center rounded-full border border-story-yellow/30 bg-story-yellow-soft px-3 py-1 text-[10px] font-semibold tracking-wide text-story-yellow md:text-[11px]">
        מחירי השקה
      </span>
      {showSubtext && (
        <span className="text-[11px] text-text/45 md:text-xs">מחירי היכרות לתקופת ההשקה</span>
      )}
    </motion.div>
  )
}
