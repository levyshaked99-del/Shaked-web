import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Check, Shield, Star, TrendingUp, User } from 'lucide-react'
import { STORY } from '../../../design/storyColors'
import { phaseProgress, useCustomerJourneyProgress } from './useCustomerJourneyProgress'
import { BrowserFrame } from './BrowserFrame'

const PURPLE = STORY.purple.DEFAULT
const PURPLE_SOFT = STORY.purple.faint
const PURPLE_MUTED = STORY.purple.muted
const GREEN = STORY.green.DEFAULT
const GREEN_SOFT = STORY.green.faint

interface CustomerJourneyViewportProps {
  progress: number
}

function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={`rounded-md bg-black/[0.05] ${className ?? ''}`} style={style} />
}

function AnimatedCursor({
  x,
  y,
  clicking,
  visible,
}: {
  x: number
  y: number
  clicking: boolean
  visible: boolean
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      animate={{ left: `${x}%`, top: `${y}%`, opacity: visible ? 1 : 0, scale: clicking ? 0.88 : 1 }}
      transition={{
        left: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
        top: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.35 },
        scale: { duration: 0.12 },
      }}
      aria-hidden
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="drop-shadow-sm md:h-[18px] md:w-[14px]">
        <path
          d="M1 1L1 14.5L4.2 11.3L7.5 17.5L9.5 16.5L6.2 10.3L11 10.3L1 1Z"
          fill="#111"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      {clicking && (
        <motion.div
          className="absolute -left-1 -top-1 h-5 w-5 rounded-full border border-black/10"
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

export function JourneyArc({ progress }: { progress: number }) {
  const lineProgress = phaseProgress(progress, 0.78, 0.98)
  const visitorOpacity = phaseProgress(progress, 0, 0.12)
  const customerOpacity = phaseProgress(progress, 0.82, 0.95)
  const growthOpacity = phaseProgress(progress, 0.88, 1)

  return (
    <div className="flex items-center justify-between gap-3">
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: Math.max(visitorOpacity, 0.35) }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] bg-white md:h-8 md:w-8">
          <User className="h-3.5 w-3.5 text-black/35 md:h-4 md:w-4" strokeWidth={1.5} />
        </div>
        <Skeleton className="hidden h-2 w-10 md:block" />
      </motion.div>

      <div className="relative min-w-0 flex-1 px-1">
        <svg viewBox="0 0 200 24" className="h-5 w-full md:h-6" preserveAspectRatio="none" aria-hidden>
          <path
            d="M 4 12 Q 100 4 196 12"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M 4 12 Q 100 4 196 12"
            fill="none"
            stroke={PURPLE}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="220"
            animate={{ strokeDashoffset: 220 - lineProgress * 220 }}
            transition={{ duration: 0.1 }}
            style={{ opacity: 0.55 + lineProgress * 0.35 }}
          />
          {lineProgress > 0.15 && (
            <motion.circle
              cx={4 + lineProgress * 192}
              cy={12 - Math.sin(lineProgress * Math.PI) * 4}
              r="2.5"
              fill={PURPLE}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </svg>
      </div>

      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: customerOpacity }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full md:h-8 md:w-8"
          animate={{
            scale: customerOpacity > 0.5 ? 1 : 0.85,
            backgroundColor: customerOpacity > 0.5 ? PURPLE_SOFT : 'rgba(0,0,0,0.04)',
            borderColor: customerOpacity > 0.5 ? PURPLE_MUTED : 'rgba(0,0,0,0.08)',
          }}
          style={{ border: '1px solid' }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `linear-gradient(135deg, ${PURPLE}33 0%, ${PURPLE}66 100%)`,
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/90"
            animate={{ opacity: customerOpacity > 0.7 ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <User className="h-3.5 w-3.5 text-black/25 md:h-4 md:w-4" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white md:h-4 md:w-4"
            style={{ backgroundColor: GREEN }}
            animate={{ scale: customerOpacity > 0.75 ? 1 : 0, opacity: customerOpacity > 0.75 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <Check className="h-2 w-2 text-white md:h-2.5 md:w-2.5" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden items-center gap-0.5 rounded-full px-2 py-0.5 md:flex"
          style={{ backgroundColor: GREEN_SOFT }}
          animate={{ opacity: growthOpacity, x: growthOpacity > 0 ? 0 : 4 }}
          transition={{ duration: 0.45 }}
        >
          <TrendingUp className="h-3 w-3" style={{ color: GREEN }} strokeWidth={2} />
          <span className="text-[9px] font-semibold tabular-nums" style={{ color: GREEN }}>
            +1
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function CustomerJourneyViewport({ progress }: CustomerJourneyViewportProps) {

  const discover = phaseProgress(progress, 0, 0.18)
  const explore = phaseProgress(progress, 0.16, 0.44)
  const trust = phaseProgress(progress, 0.4, 0.58)
  const action = phaseProgress(progress, 0.54, 0.78)
  const success = phaseProgress(progress, 0.74, 0.92)

  const scrollY = explore * 52
  const cursorVisible = discover > 0.05 && success < 0.95

  const cursorX =
    discover < 0.5
      ? 78 - discover * 30
      : explore < 0.35
        ? 48 + explore * 20
        : explore < 0.7
          ? 38 + (explore - 0.35) * 40
          : trust < 0.5
            ? 52 + trust * 8
            : action < 0.4
              ? 42 - action * 10
              : action < 0.75
                ? 38 + (action - 0.4) * 55
                : 68

  const cursorY =
    discover < 0.5
      ? 18 + discover * 22
      : explore < 0.35
        ? 40 - explore * 15
        : explore < 0.7
          ? 25 + (explore - 0.35) * 55
          : trust < 0.5
            ? 58 + trust * 12
            : action < 0.4
              ? 72 + action * 15
              : action < 0.75
                ? 86 - (action - 0.4) * 8
                : 78

  const clicking = action > 0.72 && action < 0.82

  const formField1 = phaseProgress(progress, 0.58, 0.64)
  const formField2 = phaseProgress(progress, 0.62, 0.68)
  const formField3 = phaseProgress(progress, 0.66, 0.72)
  const calendarSelect = phaseProgress(progress, 0.68, 0.76)
  const submitActive = phaseProgress(progress, 0.72, 0.78)

  const cards = [
    phaseProgress(progress, 0.22, 0.32),
    phaseProgress(progress, 0.26, 0.36),
    phaseProgress(progress, 0.3, 0.4),
  ]

  const badges = [
    phaseProgress(progress, 0.42, 0.48),
    phaseProgress(progress, 0.45, 0.51),
    phaseProgress(progress, 0.48, 0.54),
  ]

  return (
    <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 px-4 pb-8 pt-3 md:px-5 md:pt-4"
          animate={{ y: `${-scrollY}%` }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="mb-4 flex items-center justify-between"
            animate={{ opacity: discover }}
            transition={{ duration: 0.1 }}
          >
            <Skeleton className="h-3 w-12 md:h-3.5 md:w-14" />
            <div className="flex gap-2">
              {[0.5, 0.65, 0.8].map((o, i) => (
                <Skeleton key={i} className="h-2 w-6 md:h-2.5 md:w-8" style={{ opacity: o }} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mb-5 rounded-xl bg-black/[0.02] p-4 md:mb-6 md:p-5"
            animate={{ opacity: discover, y: (1 - discover) * 8 }}
            transition={{ duration: 0.1 }}
          >
            <Skeleton className="mb-2.5 h-2.5 w-[72%] md:h-3" />
            <Skeleton className="mb-1.5 h-2 w-[55%]" />
            <Skeleton className="mb-4 h-2 w-[40%]" />
            <motion.div
              className="inline-flex rounded-full px-3 py-1 md:px-3.5 md:py-1.5"
              style={{ backgroundColor: PURPLE_SOFT }}
              animate={{ opacity: discover * 0.9 + explore * 0.1 }}
            >
              <Skeleton className="h-2 w-14 md:h-2.5 md:w-16" style={{ backgroundColor: PURPLE_MUTED }} />
            </motion.div>
          </motion.div>

          <div className="mb-5 grid grid-cols-3 gap-2 md:mb-6 md:gap-2.5">
            {cards.map((cardProgress, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-lg border border-black/[0.05] bg-white p-2.5 md:p-3"
                animate={{
                  opacity: cardProgress,
                  y: (1 - cardProgress) * 12,
                }}
                transition={{ duration: 0.1 }}
              >
                <Skeleton className="mb-2 aspect-[4/3] w-full rounded-md" />
                <Skeleton className="mb-1 h-1.5 w-[80%]" />
                <Skeleton className="h-1.5 w-[55%]" />
              </motion.div>
            ))}
          </div>

          <div className="mb-5 flex flex-wrap justify-center gap-1.5 md:mb-6 md:gap-2">
            {[
              { icon: Shield },
              { icon: Star },
              { icon: Check },
            ].map(({ icon: Icon }, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-[#fafafa] px-2 py-1 md:px-2.5 md:py-1"
                animate={{
                  opacity: badges[i],
                  scale: 0.92 + badges[i] * 0.08,
                }}
                transition={{ duration: 0.1 }}
              >
                <Icon className="h-2.5 w-2.5 text-black/30 md:h-3 md:w-3" strokeWidth={1.75} />
                <Skeleton className={`h-1.5 ${i === 0 ? 'w-14 md:w-16' : i === 1 ? 'w-12 md:w-14' : 'w-16 md:w-[4.5rem]'}`} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-[1.1fr_0.9fr] gap-2.5 md:gap-3">
            <motion.div
              className="rounded-lg border border-black/[0.05] bg-white p-2.5 md:p-3"
              animate={{ opacity: action > 0.05 ? 1 : explore * 0.4 + trust * 0.6 }}
            >
              {[formField1, formField2, formField3].map((fill, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <Skeleton className="mb-1 h-1.5 w-8" />
                  <div className="relative h-5 overflow-hidden rounded-md border border-black/[0.06] bg-black/[0.02] md:h-6">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-md"
                      style={{ backgroundColor: PURPLE_SOFT }}
                      animate={{ width: `${fill * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    {fill > 0.3 && (
                      <motion.div
                        className="absolute inset-y-1 left-1.5 w-px"
                        style={{ backgroundColor: PURPLE }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>
              ))}
              <motion.div
                className="mt-2.5 flex justify-end"
                animate={{
                  opacity: submitActive,
                  scale: submitActive > 0.5 ? 1 : 0.96,
                }}
              >
                <div
                  className="rounded-full px-3 py-1 md:px-3.5 md:py-1.5"
                  style={{
                    backgroundColor: submitActive > 0.4 ? PURPLE : PURPLE_SOFT,
                    opacity: 0.5 + submitActive * 0.5,
                  }}
                >
                  <Skeleton className="h-1.5 w-10 md:h-2 md:w-12" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-lg border border-black/[0.05] bg-white p-2.5 md:p-3"
              animate={{ opacity: action > 0.05 ? 1 : trust * 0.5 }}
            >
              <Skeleton className="mb-2 h-1.5 w-12" />
              <div className="mb-1.5 grid grid-cols-7 gap-0.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-sm" />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: 14 }).map((_, i) => {
                  const isSelected = i === 9
                  const selected = isSelected ? calendarSelect : 0
                  return (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-sm"
                      animate={{
                        backgroundColor: selected > 0 ? PURPLE : 'rgba(0,0,0,0.05)',
                        scale: selected > 0.5 ? 1.05 : 1,
                        opacity: selected > 0 ? 0.4 + selected * 0.6 : 0.35 + (i % 3) * 0.05,
                      }}
                      transition={{ duration: 0.15 }}
                    />
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatedCursor x={cursorX} y={cursorY} clicking={clicking} visible={cursorVisible} />

        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-[2px]"
          animate={{ opacity: success * 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 rounded-2xl border border-black/[0.06] bg-white px-6 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:gap-2.5 md:px-8 md:py-6"
            animate={{
              opacity: success,
              scale: 0.92 + success * 0.08,
              y: (1 - success) * 10,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full md:h-11 md:w-11"
              style={{ backgroundColor: GREEN_SOFT }}
              animate={{ scale: success > 0.5 ? 1 : 0.8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <Check className="h-5 w-5 md:h-5 md:w-5" style={{ color: GREEN }} strokeWidth={2.5} />
            </motion.div>
            <Skeleton className="h-2 w-20 md:h-2.5 md:w-24" />
            <Skeleton className="h-1.5 w-14 md:w-16" />
          </motion.div>
        </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent"
        aria-hidden
      />
    </div>
  )
}

export function CustomerJourneyAnimation({ paused = false }: { paused?: boolean }) {
  const { progress } = useCustomerJourneyProgress(paused)

  return (
    <BrowserFrame footer={<JourneyArc progress={progress} />}>
      <CustomerJourneyViewport progress={progress} />
    </BrowserFrame>
  )
}
