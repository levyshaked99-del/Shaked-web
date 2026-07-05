import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { stageMaterials, type MaterialType } from '../showcase/stageMaterials'
import type { JourneyStage } from './journeyConfig'

interface JourneyScreenProps {
  stage: JourneyStage
  direction: number
  children: ReactNode
}

const ease = [0.4, 0, 0.2, 1] as const

function StageShell({
  material,
  isLaunch,
  children,
}: {
  material: MaterialType
  isLaunch: boolean
  children: ReactNode
}) {
  const m = stageMaterials[material]
  const radius = isLaunch ? 20 : 16

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: radius,
        background: m.background,
        border: `1px solid ${m.border}`,
        boxShadow: m.shadow,
        backgroundSize: material === 'blueprint' ? '16px 16px' : undefined,
      }}
    >
      {m.overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: m.overlay,
            backgroundSize: material === 'blueprint' ? '16px 16px' : undefined,
          }}
        />
      )}
      {isLaunch && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[22%]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0] }}
            transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.9), transparent 65%)',
            }}
          />
        </>
      )}
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}

export function JourneyScreen({ stage, direction, children }: JourneyScreenProps) {
  const isLaunch = stage.id === 5

  return (
    <div className="relative w-full">
      {/* Ambient studio light */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-[24px] opacity-60 md:-inset-8 md:rounded-[32px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(250,250,252,0.9) 0%, transparent 70%)',
        }}
      />

      {isLaunch && (
        <motion.div
          className="pointer-events-none absolute -inset-2 rounded-[20px] md:-inset-4 md:rounded-[28px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2 }}
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.5) 0%, transparent 65%)',
            filter: 'blur(24px)',
          }}
        />
      )}

      <div
        className="relative aspect-[10/7] w-full max-w-[440px] overflow-hidden md:max-w-[580px]"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stage.id}
            custom={direction}
            className="absolute inset-0"
            initial="enter"
            animate="center"
            exit="exit"
            variants={{
              enter: (d: number) => ({
                opacity: 0,
                scale: d >= 0 ? 0.94 : 0.96,
                filter: 'blur(10px)',
                y: d >= 0 ? 12 : -12,
              }),
              center: {
                opacity: 1,
                scale: isLaunch ? 1 : 1,
                filter: 'blur(0px)',
                y: 0,
              },
              exit: (d: number) => ({
                opacity: 0,
                scale: d >= 0 ? 1.03 : 1.01,
                filter: 'blur(8px)',
                y: d >= 0 ? -10 : 10,
              }),
            }}
            transition={{
              duration: isLaunch ? 0.85 : 0.7,
              ease,
            }}
          >
            <StageShell material={stage.material} isLaunch={isLaunch}>
              <div className="h-full w-full">{children}</div>
            </StageShell>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stage caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          className="mt-2 flex items-center justify-center gap-2 md:mt-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="text-[10px] font-medium tabular-nums tracking-[0.12em] text-text/40 md:text-[11px] md:tracking-[0.15em]">
            {stage.stage}
          </span>
          <span className="text-[10px] text-text/20 md:text-[11px]">—</span>
          <span className="text-[10px] text-text/55 md:text-[11px]">{stage.label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
