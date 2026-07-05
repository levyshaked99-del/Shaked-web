import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'

export const TRUST_SIGNALS = [
  'עיצוב ייחודי',
  'בלי תבניות',
  'פיתוח מודרני',
  'ביצועים גבוהים',
  'SEO בסיסי',
  'ליווי אישי',
  '30 ימי אחריות',
  'עד 3 סבבי תיקונים',
] as const

interface TrustSignalsProps {
  inView?: boolean
  delay?: number
  className?: string
  compact?: boolean
}

export function TrustSignals({
  inView = true,
  delay = 0,
  className = '',
  compact = false,
}: TrustSignalsProps) {
  return (
    <motion.ul
      className={`flex flex-wrap items-center justify-center gap-2 md:gap-2.5 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
      aria-label="יתרונות השירות"
    >
      {TRUST_SIGNALS.map((signal, index) => (
        <motion.li
          key={signal}
          className={`flex list-none items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/80 ${
            compact ? 'px-2.5 py-1' : 'px-3 py-1.5'
          }`}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: delay + index * 0.04, ease: EASE_PREMIUM }}
        >
          <Check size={11} strokeWidth={2.25} className="shrink-0 text-story-green" aria-hidden />
          <span className={`font-medium text-text/65 ${compact ? 'text-[10px] md:text-[11px]' : 'text-[11px] md:text-xs'}`}>
            {signal}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
