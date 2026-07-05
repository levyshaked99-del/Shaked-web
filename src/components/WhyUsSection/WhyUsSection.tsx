import { AnimatePresence, LayoutGroup, motion, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { ProcessShowcaseVisual } from './ProcessShowcase/ProcessShowcaseVisual'
import {
  WHY_US_EYEBROW,
  WHY_US_HEADLINE,
  WHY_US_PARAGRAPH,
  WHY_US_PRINCIPLES,
  type WhyUsPrinciple,
} from './whyUsData'

const TRANSITION = { duration: 0.55, ease: EASE_PREMIUM }
const RAIL_SPRING = { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.85 }
const AUTO_INTERVAL = 6500

interface StepItemProps {
  item: WhyUsPrinciple
  isActive: boolean
  onSelect: () => void
}

function StepItem({ item, isActive, onSelect }: StepItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className="relative flex flex-1 flex-col items-center px-1 pt-1 text-center md:px-1.5"
    >
      {isActive && (
        <motion.span
          layoutId="why-us-step-rail"
          className="absolute top-0 h-1.5 w-1.5 rounded-full bg-story-purple shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
          transition={RAIL_SPRING}
          aria-hidden
        />
      )}

      <motion.span
        className="mt-4 block text-[10px] font-semibold tabular-nums tracking-[0.12em] md:mt-5 md:text-[11px]"
        animate={{ color: isActive ? 'rgba(124, 58, 237, 0.65)' : 'rgba(17,17,17,0.2)' }}
        transition={TRANSITION}
      >
        {item.number}
      </motion.span>

      <motion.h3
        className="mt-2 min-h-[2.4em] text-[0.6875rem] font-bold leading-[1.35] tracking-tight md:min-h-[2.6em] md:text-xs md:leading-[1.4]"
        animate={{
          color: isActive ? '#111111' : 'rgba(17,17,17,0.28)',
        }}
        transition={TRANSITION}
      >
        {item.title}
      </motion.h3>
    </button>
  )
}

export function WhyUsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-20%' })
  const total = WHY_US_PRINCIPLES.length
  const active = WHY_US_PRINCIPLES[activeIndex]

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total)
  }, [total])

  useEffect(() => {
    if (!inView || paused) return
    const timer = setInterval(goNext, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [inView, paused, goNext, activeIndex])

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative scroll-mt-28 overflow-hidden bg-white px-6 py-28 md:px-10 md:py-36 lg:px-16 lg:py-40"
      aria-labelledby="why-us-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/80 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:[direction:ltr]">
          <div className="order-2 flex items-center justify-center lg:order-none lg:col-start-1 lg:row-start-1">
            <ProcessShowcaseVisual activeStep={activeIndex} playing={inView && !paused} />
          </div>

          <div dir="rtl" className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:ps-4 xl:ps-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={TRANSITION}
              className="mb-14 md:mb-16 lg:mb-20"
            >
              <div className="mb-8 flex items-center justify-between md:mb-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-secondary/40 px-3.5 py-1.5 text-[11px] font-medium text-story-purple/65 md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-story-purple" aria-hidden />
                  {WHY_US_EYEBROW}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.number}
                    className="text-[11px] font-medium tabular-nums tracking-[0.12em] text-muted md:text-xs"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  >
                    {active.number} / {String(total).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              <h2
                id="why-us-heading"
                className="whitespace-pre-line text-[clamp(1.75rem,3.8vw,2.85rem)] font-extrabold leading-[1.1] tracking-tight text-text"
              >
                {WHY_US_HEADLINE}
              </h2>
              <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.85] text-text/45 md:mt-6 md:text-base md:leading-[1.9]">
                {WHY_US_PARAGRAPH}
              </p>
            </motion.div>

            <div className="relative">
              <LayoutGroup id="why-us-steps">
                <div role="tablist" aria-label="שלבי התהליך">
                  <div className="relative">
                    <div
                      className="pointer-events-none absolute inset-x-3 top-[3px] h-px bg-black/[0.06] md:inset-x-4"
                      aria-hidden
                    />
                    <div className="flex items-start justify-between gap-0.5 md:gap-1">
                      {WHY_US_PRINCIPLES.map((item, i) => (
                        <motion.div
                          key={item.id}
                          className="flex flex-1"
                          animate={{ opacity: i === activeIndex ? 1 : 0.42 }}
                          transition={TRANSITION}
                        >
                          <StepItem
                            item={item}
                            isActive={i === activeIndex}
                            onSelect={() => setActiveIndex(i)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active.id}
                      className="mx-auto mt-6 max-w-[16rem] whitespace-pre-line text-center text-sm leading-[1.8] text-text/50 md:mt-7 md:max-w-[18rem] md:text-[0.9375rem] md:leading-[1.85]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={TRANSITION}
                    >
                      {active.description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
