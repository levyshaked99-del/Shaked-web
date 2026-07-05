import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../motion/easing'
import { STORY } from '../../design/storyColors'

interface ProcessFlowLinksProps {
  inView: boolean
}

const SEGMENTS = [
  { d: 'M 74 21 C 58 21 42 21 26 21', delay: 0.5 },
  { d: 'M 26 27 C 26 42 48 58 74 72', delay: 0.85 },
  { d: 'M 74 78 C 58 78 42 78 26 78', delay: 1.15 },
] as const

const FLOW_DOTS = [
  { cx: 50, cy: 21, delay: 1.6 },
  { cx: 42, cy: 48, delay: 2.1 },
  { cx: 50, cy: 78, delay: 2.6 },
] as const

export function ProcessFlowLinks({ inView }: ProcessFlowLinksProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {SEGMENTS.map(({ d, delay }, i) => (
        <g key={i}>
          <motion.path
            d={d}
            stroke="#111"
            strokeWidth="0.35"
            strokeOpacity="0.05"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
            transition={{ duration: 1.2, delay, ease: EASE_PREMIUM }}
          />
          <motion.path
            d={d}
            stroke={STORY.blue.DEFAULT}
            strokeWidth="0.45"
            strokeOpacity="0.1"
            strokeLinecap="round"
            strokeDasharray="1.2 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: inView ? 1 : 0,
              opacity: inView ? 0.4 : 0,
              strokeDashoffset: inView ? [0, -12] : 0,
            }}
            transition={{
              pathLength: { duration: 1.2, delay, ease: EASE_PREMIUM },
              opacity: { duration: 0.6, delay },
              strokeDashoffset: { duration: 5, repeat: Infinity, ease: 'linear', delay: delay + 1.2 },
            }}
          />
        </g>
      ))}

      {FLOW_DOTS.map(({ cx, cy, delay }, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="0.55"
          fill={STORY.blue.DEFAULT}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView
              ? { opacity: [0, 0.35, 0.12, 0.3, 0], scale: [0.8, 1, 1, 1, 0.8] }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  )
}
