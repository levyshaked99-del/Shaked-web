import { AnimatePresence, motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../../motion/easing'
import { ProcessBrowserFrame } from './ProcessBrowserFrame'
import { StageDesign } from './stages/StageDesign'
import { StageLaunch } from './stages/StageLaunch'
import { StagePlan } from './stages/StagePlan'
import { StageUnderstand } from './stages/StageUnderstand'

const TRANSITION = { duration: 0.6, ease: EASE_PREMIUM }

const STAGES = [
  { id: 'understand', Component: StageUnderstand },
  { id: 'plan', Component: StagePlan },
  { id: 'design', Component: StageDesign },
  { id: 'launch', Component: StageLaunch },
] as const

interface ProcessShowcaseVisualProps {
  activeStep: number
  playing: boolean
}

export function ProcessShowcaseVisual({ activeStep, playing }: ProcessShowcaseVisualProps) {
  const stage = STAGES[activeStep] ?? STAGES[0]
  const StageComponent = stage.Component

  return (
    <div className="relative w-full max-w-[580px] lg:max-w-none">
      <div className="flex items-stretch gap-3 md:gap-4">
        <ol
          className="flex flex-col items-center justify-center gap-2 py-4 md:gap-2.5 md:py-6"
          aria-label="שלבי התהליך"
        >
          {STAGES.map((s, i) => (
            <li key={s.id} aria-current={i === activeStep ? 'step' : undefined}>
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

          {playing && (
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

          <ProcessBrowserFrame stepIndex={activeStep}>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.008 }}
                transition={TRANSITION}
              >
                <StageComponent />
              </motion.div>
            </AnimatePresence>
          </ProcessBrowserFrame>
        </div>
      </div>
    </div>
  )
}
