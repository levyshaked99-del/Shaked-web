import { motion } from 'framer-motion'
import { EASE_OUT } from '../../motion/easing'

const CHECK_DRAW_DURATION = 0.4
const CHECK_SETTLE_DURATION = 0.15
const CHECK_GLOW_DURATION = 0.2

interface AnimatedCheckmarkProps {
  active: boolean
  delay?: number
}

const CHECK_PATH = 'M6.5 11.2 L9.8 14.5 L15.8 8.2'
const STROKE_COLOR = '#16A34A'

export function AnimatedCheckmark({ active, delay = 0 }: AnimatedCheckmarkProps) {
  const glowDelay = delay + CHECK_DRAW_DURATION + CHECK_SETTLE_DURATION * 0.35

  return (
    <motion.span
      className="relative inline-flex shrink-0"
      aria-hidden
      initial={{ filter: 'drop-shadow(0 0 0 rgba(37,99,235,0))' }}
      animate={
        active
          ? {
              filter: [
                'drop-shadow(0 0 0 rgba(37,99,235,0))',
                'drop-shadow(0 0 8px rgba(37,99,235,0.3))',
                'drop-shadow(0 0 0 rgba(37,99,235,0))',
              ],
            }
          : { filter: 'drop-shadow(0 0 0 rgba(37,99,235,0))' }
      }
      transition={
        active
          ? {
              delay: glowDelay,
              duration: CHECK_GLOW_DURATION,
              times: [0, 0.5, 1],
              ease: EASE_OUT,
            }
          : { duration: 0.2 }
      }
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="rgba(17,17,17,0.06)" strokeWidth="1" fill="#fafafa" />
        <motion.path
          d={CHECK_PATH}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={
            active
              ? { pathLength: 1, opacity: [0.4, 0.92, 1] }
              : { pathLength: 0, opacity: 0.4 }
          }
          transition={
            active
              ? {
                  pathLength: {
                    duration: CHECK_DRAW_DURATION,
                    delay,
                    ease: EASE_OUT,
                  },
                  opacity: {
                    duration: CHECK_DRAW_DURATION + CHECK_SETTLE_DURATION,
                    delay,
                    ease: EASE_OUT,
                    times: [
                      0,
                      CHECK_DRAW_DURATION / (CHECK_DRAW_DURATION + CHECK_SETTLE_DURATION),
                      1,
                    ],
                  },
                }
              : {
                  pathLength: { duration: 0.2, ease: EASE_OUT },
                  opacity: { duration: 0.2 },
                }
          }
        />
      </svg>
    </motion.span>
  )
}
