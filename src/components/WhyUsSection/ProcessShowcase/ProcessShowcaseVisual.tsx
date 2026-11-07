import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { EASE_PREMIUM } from '../../../motion/easing'
import { WHY_US_PRINCIPLES } from '../whyUsData'
import { ProcessBrowserFrame } from './ProcessBrowserFrame'
import { StageDesign } from './stages/StageDesign'
import { StageLaunch } from './stages/StageLaunch'
import { StagePlan } from './stages/StagePlan'
import { StageUnderstand } from './stages/StageUnderstand'

const TRANSITION = { duration: 0.6, ease: EASE_PREMIUM }

const STAGE_COMPONENTS = [StageUnderstand, StagePlan, StageDesign, StageLaunch] as const

interface ProcessShowcaseVisualProps {
  activeStep: number
  playing: boolean
}

export function ProcessShowcaseVisual({ activeStep, playing }: ProcessShowcaseVisualProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const principle = WHY_US_PRINCIPLES[activeStep] ?? WHY_US_PRINCIPLES[0]
  const StageView = STAGE_COMPONENTS[activeStep] ?? StageUnderstand
  const motionEnabled = playing && !prefersReducedMotion

  return (
    <div className="relative w-full max-w-[580px] lg:max-w-none">
      <div className="flex items-stretch gap-3 md:gap-4">
        <ol
          className="flex flex-col items-center justify-center gap-2 py-4 md:gap-2.5 md:py-6"
          aria-label="שלבי התהליך"
        >
          {WHY_US_PRINCIPLES.map((step, i) => (
            <li key={step.id} aria-current={i === activeStep ? 'step' : undefined}>
              <motion.div
                className="w-1 rounded-full bg-text/10"
                animate={{
                  height: i === activeStep ? 28 : 6,
                  backgroundColor:
                    i === activeStep ? 'rgba(124, 58, 237, 0.55)' : 'rgba(17, 17, 17, 0.08)',
                }}
                transition={TRANSITION}
              />
            </li>
          ))}
        </ol>

        <div className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-full opacity-80 md:-inset-x-12 md:-inset-y-10"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)',
            }}
            aria-hidden
          />

          {motionEnabled && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(124,58,237,0.05) 0%, transparent 65%)',
              }}
              aria-hidden
            />
          )}

          <div
            className="relative"
            role="img"
            aria-label={principle.illustrationAlt}
          >
            <ProcessBrowserFrame stepIndex={activeStep}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={principle.id}
                  className="absolute inset-0 h-full w-full"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={TRANSITION}
                >
                  <StageView motionEnabled={motionEnabled} />
                </motion.div>
              </AnimatePresence>
            </ProcessBrowserFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
