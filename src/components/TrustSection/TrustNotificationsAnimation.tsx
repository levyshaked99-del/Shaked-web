import { motion } from 'framer-motion'
import { EASE_OUT, EASE_PREMIUM } from '../../motion/easing'
import { TRUST_NOTIFICATIONS } from './trustData'

const PURPLE = '#7C3AED'
const CHECK_PATH = 'M3.5 6.2 L6 8.7 L10.5 3.8'

interface TrustNotificationsAnimationProps {
  active: boolean
}

export function TrustNotificationsAnimation({ active }: TrustNotificationsAnimationProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-[340px] space-y-4">
        {TRUST_NOTIFICATIONS.map((message, i) => (
          <motion.div
            key={message}
            className="flex items-center justify-end gap-3 border-b border-black/[0.05] py-4 last:border-0"
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.65, delay: 0.35 + i * 0.45, ease: EASE_PREMIUM }}
          >
            <span className="text-[0.9375rem] font-medium text-text/65 md:text-base">{message}</span>
            <motion.span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-story-purple/20 bg-story-purple-soft/60"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.45, ease: EASE_OUT }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <motion.path
                  d={CHECK_PATH}
                  stroke={PURPLE}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.35, delay: 0.65 + i * 0.45, ease: EASE_OUT }}
                />
              </svg>
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
