import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { PremiumBadge } from './PremiumBadge'
import type { IncludedBadge } from './includedItemsData'

interface AccordionPanelProps {
  id: string
  label: string
  description: string
  badge?: IncludedBadge
  isOpen: boolean
  onToggle: () => void
  index: number
  inView: boolean
  isLast?: boolean
  variant?: 'included' | 'faq'
}

export function AccordionPanel({
  id,
  label,
  description,
  badge,
  isOpen,
  onToggle,
  index,
  inView,
  isLast = false,
  variant = 'included',
}: AccordionPanelProps) {
  const rowDelay = index * 0.08
  const panelId = `${variant}-panel-${id}`
  const headerId = `${variant}-header-${id}`

  return (
    <motion.li
      className={`group list-none ${isLast ? '' : 'border-b border-black/[0.06]'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: rowDelay, ease: EASE_PREMIUM }}
    >
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-5 text-start transition-colors duration-300 hover:bg-black/[0.015] md:gap-6 md:px-2 md:py-6"
      >
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5 md:gap-3">
          {variant === 'included' && (
            <motion.span
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-[#fafafa]"
              animate={{
                borderColor: isOpen ? 'rgba(22,163,74,0.25)' : 'rgba(17,17,17,0.06)',
                backgroundColor: isOpen ? 'rgba(220,252,231,0.5)' : '#fafafa',
              }}
              transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            >
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0.35 }}
                transition={{ duration: 0.3 }}
              >
                <motion.path
                  d="M2.5 6.2 L5 8.7 L9.5 3.8"
                  stroke="#16A34A"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isOpen ? 1 : 0.6 }}
                  transition={{ duration: isOpen ? 0.4 : 0.25, ease: EASE_PREMIUM }}
                />
              </motion.svg>
            </motion.span>
          )}

          <span
            className={`text-end font-medium leading-snug text-text transition-colors duration-300 ${
              variant === 'faq'
                ? 'text-[0.9375rem] md:text-base'
                : 'text-[0.9375rem] md:text-base'
            } ${isOpen ? 'text-text' : 'text-text/85 group-hover:text-text'}`}
          >
            {label}
          </span>

          {badge && <PremiumBadge type={badge} visible={inView} delay={rowDelay + 0.15} />}
        </div>

        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/80 text-text/40 transition-colors duration-300 group-hover:border-black/[0.1] group-hover:text-text/60"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          aria-hidden
        >
          <ChevronDown size={16} strokeWidth={1.75} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE_PREMIUM }}
            className="overflow-hidden"
          >
            <p className="px-1 pb-5 text-end text-[0.875rem] leading-[1.8] text-text/55 md:px-2 md:pb-6 md:text-[0.9375rem] md:leading-[1.85]">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
