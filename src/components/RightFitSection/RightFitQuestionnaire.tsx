import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_PREMIUM } from '../../motion/easing'
import {
  RIGHT_FIT_QUESTIONS,
  answerKeyForStep,
  optionsForStep,
} from './rightFitData'
import { composeResult } from './rightFitLogic'
import { RightFitOptionButton } from './RightFitOption'
import { RightFitProgress } from './RightFitProgress'
import { RightFitResult } from './RightFitResult'
import type { RightFitAnswers, RightFitStep } from './rightFitTypes'

const TRANSITION = { duration: 0.55, ease: EASE_PREMIUM }

export function RightFitQuestionnaire() {
  const reducedMotion = usePrefersReducedMotion()
  const groupId = useId()
  const headingId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)

  const [step, setStep] = useState<RightFitStep>(1)
  const [answers, setAnswers] = useState<RightFitAnswers>({})

  const focusHeading = useCallback(() => {
    requestAnimationFrame(() => headingRef.current?.focus())
  }, [])

  const currentQuestion = step !== 'result' ? RIGHT_FIT_QUESTIONS[step - 1] : null
  const answerKey = step !== 'result' ? answerKeyForStep(step) : null
  const selectedValue = answerKey ? answers[answerKey] : undefined
  const options = step !== 'result' ? optionsForStep(step) : []

  const handleSelect = (id: string) => {
    if (step === 'result' || !answerKey) return
    setAnswers((prev) => ({ ...prev, [answerKey]: id as never }))
  }

  const handleNext = () => {
    if (step === 'result') return
    if (!selectedValue) return
    if (step === 4) {
      setStep('result')
      focusHeading()
      return
    }
    setStep((step + 1) as RightFitStep)
    focusHeading()
  }

  const handleBack = () => {
    if (step === 'result') {
      setStep(4)
      focusHeading()
      return
    }
    if (step > 1) {
      setStep((step - 1) as RightFitStep)
      focusHeading()
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setStep(1)
    focusHeading()
  }

  const result = step === 'result' ? composeResult(answers) : null

  return (
    <div className="mx-auto w-full max-w-[640px] rounded-2xl border border-black/[0.06] bg-white p-6 shadow-depth-md md:p-8 lg:p-10">
      <AnimatePresence mode="wait">
        {step !== 'result' && currentQuestion ? (
          <motion.div
            key={`step-${step}`}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={TRANSITION}
          >
            <RightFitProgress step={step} />

            <h3
              id={headingId}
              ref={headingRef}
              tabIndex={-1}
              className="mt-8 text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold tracking-tight text-text outline-none"
            >
              {currentQuestion.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text/55 md:text-[0.9375rem]">
              {currentQuestion.description}
            </p>

            <div
              className="mt-8 space-y-2.5"
              role="radiogroup"
              aria-labelledby={headingId}
              id={groupId}
            >
              {options.map((option) => {
                const optionDomId = `${groupId}-${option.id}`
                return (
                  <RightFitOptionButton
                    key={option.id}
                    id={optionDomId}
                    label={option.label}
                    description={option.description}
                    selected={selectedValue === option.id}
                    onSelect={() => handleSelect(option.id)}
                  />
                )
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-medium text-text/50 transition-colors duration-300 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-story-purple/35 focus-visible:ring-offset-2"
                >
                  חזרה
                </button>
              ) : (
                <span aria-hidden />
              )}

              <motion.button
                type="button"
                disabled={!selectedValue}
                onClick={handleNext}
                className="group ms-auto inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg disabled:pointer-events-none disabled:opacity-45"
                whileHover={selectedValue && !reducedMotion ? { y: -2 } : undefined}
                whileTap={selectedValue && !reducedMotion ? { scale: 0.98 } : undefined}
              >
                {step === 4 ? 'סיום' : 'הבא'}
                <ArrowLeft size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              </motion.button>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={TRANSITION}
          >
            <RightFitResult result={result} onRestart={handleRestart} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
