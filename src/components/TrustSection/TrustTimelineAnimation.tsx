import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE_OUT, EASE_PREMIUM } from '../../motion/easing'
import { TIMELINE_STAGES } from './trustData'

const PURPLE = '#7C3AED'
const CHECK_PATH = 'M3.5 6.2 L6 8.7 L10.5 3.8'

interface TrustTimelineAnimationProps {
  active: boolean
}

export function TrustTimelineAnimation({ active }: TrustTimelineAnimationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }

    const start = performance.now()
    const duration = 2800

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased * 100)
      if (t < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active])

  const stageProgress = (progress / 100) * TIMELINE_STAGES.length
  const completedCount = Math.floor(stageProgress)
  const allComplete = progress >= 99.5

  return (
    <div className="flex h-full w-full items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-[380px]">
        <div className="mb-10 h-px overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full transition-[width] duration-100"
            style={{ backgroundColor: PURPLE, width: `${progress}%`, opacity: 0.55 }}
          />
        </div>

        <div className="space-y-7">
          {TIMELINE_STAGES.map((stage, i) => {
            const isComplete = allComplete || i < completedCount
            const isCurrent = !allComplete && i === completedCount

            return (
              <motion.div
                key={stage}
                className="flex items-center justify-end gap-4"
                initial={{ opacity: 0, x: 12 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE_PREMIUM }}
              >
                <span
                  className={`text-[0.9375rem] font-medium transition-colors duration-500 md:text-base ${
                    isCurrent ? 'text-text' : isComplete ? 'text-text/55' : 'text-text/30'
                  }`}
                >
                  {stage}
                </span>

                <motion.span
                  className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                  animate={{
                    borderColor: isCurrent
                      ? 'rgba(124, 58, 237, 0.45)'
                      : isComplete
                        ? 'rgba(124, 58, 237, 0.25)'
                        : 'rgba(17, 17, 17, 0.08)',
                    backgroundColor: isCurrent
                      ? 'rgba(245, 243, 255, 0.9)'
                      : isComplete
                        ? 'rgba(245, 243, 255, 0.5)'
                        : 'transparent',
                    boxShadow: isCurrent ? '0 0 20px rgba(124, 58, 237, 0.2)' : '0 0 0 rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                >
                  {isComplete && (
                    <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <motion.path
                        d={CHECK_PATH}
                        stroke={PURPLE}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      />
                    </motion.svg>
                  )}
                  {isCurrent && (
                    <motion.span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: PURPLE }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                  )}
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
