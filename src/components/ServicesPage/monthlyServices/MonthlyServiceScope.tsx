import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { EASE_PREMIUM } from '../../../motion/easing'
import {
  MONTHLY_SERVICE_EXCLUDED,
  MONTHLY_SERVICE_INCLUDED,
} from './servicesMonthlyServicesData'

interface MonthlyServiceScopeProps {
  inView: boolean
}

const TRANSITION = { duration: 0.65, ease: EASE_PREMIUM }

function ScopeColumn({
  title,
  items,
  variant,
  delay,
  inView,
}: {
  title: string
  items: readonly string[]
  variant: 'included' | 'excluded'
  delay: number
  inView: boolean
}) {
  const isIncluded = variant === 'included'

  return (
    <motion.div
      className="flex flex-col bg-white p-5 md:p-6 lg:p-7"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ ...TRANSITION, delay }}
    >
      <h3
        className={`text-[11px] font-semibold uppercase tracking-[0.14em] md:text-xs ${
          isIncluded ? 'text-story-purple/65' : 'text-text/35'
        }`}
      >
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-2.5 text-start"
            initial={{ opacity: 0, x: isIncluded ? 6 : -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isIncluded ? 6 : -6 }}
            transition={{ ...TRANSITION, delay: delay + 0.04 + i * 0.04 }}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                isIncluded
                  ? 'border-story-purple/15 bg-story-purple-soft/50'
                  : 'border-black/[0.06] bg-secondary/60'
              }`}
              aria-hidden
            >
              {isIncluded ? (
                <Check size={10} strokeWidth={2.5} className="text-story-purple/75" />
              ) : (
                <Minus size={10} strokeWidth={2.5} className="text-text/30" />
              )}
            </span>
            <span
              className={`text-[0.8125rem] leading-[1.65] md:text-[0.875rem] md:leading-[1.7] ${
                isIncluded ? 'text-text/55' : 'text-text/38'
              }`}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function MonthlyServiceScope({ inView }: MonthlyServiceScopeProps) {
  return (
    <div className="grid grid-cols-1 gap-px bg-black/[0.06] sm:grid-cols-2">
      <ScopeColumn title="כולל" items={MONTHLY_SERVICE_INCLUDED} variant="included" delay={0.2} inView={inView} />
      <ScopeColumn title="לא כולל" items={MONTHLY_SERVICE_EXCLUDED} variant="excluded" delay={0.28} inView={inView} />
    </div>
  )
}
