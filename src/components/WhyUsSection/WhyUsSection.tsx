import { AnimatePresence, LayoutGroup, motion, useInView } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_PREMIUM } from '../../motion/easing'
import { ProcessShowcaseVisual } from './ProcessShowcase/ProcessShowcaseVisual'
import { WhyUsProcessCard } from './WhyUsProcessCard'
import {
  WHY_US_EYEBROW,
  WHY_US_HEADLINE,
  WHY_US_PARAGRAPH,
  WHY_US_PRINCIPLES,
  type WhyUsPrinciple,
} from './whyUsData'

const TRANSITION = { duration: 0.55, ease: EASE_PREMIUM }
const MOBILE_PANEL_TRANSITION = { duration: 0.4, ease: EASE_PREMIUM }
const RAIL_SPRING = { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.85 }
const AUTO_INTERVAL = 6500

interface StepItemProps {
  item: WhyUsPrinciple
  isActive: boolean
  onSelect: () => void
}

function StepItem({ item, isActive, onSelect }: StepItemProps) {
  const tabId = `why-us-tab-${item.id}`
  const panelId = `why-us-panel-${item.id}`

  return (
    <button
      type="button"
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      onMouseEnter={onSelect}
      onClick={onSelect}
      className="relative flex flex-1 flex-col items-center px-1 pt-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-story-purple/35 focus-visible:ring-offset-2 md:px-1.5"
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
        className="mt-3 block text-[10px] font-semibold tabular-nums tracking-[0.12em] md:mt-5 md:text-[11px]"
        animate={{ color: isActive ? '#5B21B6' : '#374151' }}
        transition={TRANSITION}
      >
        {item.number}
      </motion.span>

      <motion.h3
        className="mt-1.5 min-h-[2.2em] text-[0.6875rem] font-bold leading-[1.35] tracking-tight md:mt-2 md:min-h-[2.6em] md:text-xs md:leading-[1.4]"
        animate={{
          color: isActive ? '#111111' : '#374151',
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
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-20%' })
  const total = WHY_US_PRINCIPLES.length
  const active = WHY_US_PRINCIPLES[activeIndex]

  const selectStep = useCallback((index: number) => {
    setActiveIndex(index)
    setPaused(true)
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total)
    }, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [inView, paused, total])

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative scroll-mt-28 overflow-hidden bg-white px-6 py-20 md:px-10 md:py-36 lg:px-16 lg:py-40"
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
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:[direction:ltr]">
          <div className="hidden md:flex md:order-2 md:items-center md:justify-center lg:order-none lg:col-start-1 lg:row-start-1">
            <ProcessShowcaseVisual activeStep={activeIndex} playing={inView && !paused} />
          </div>

          <div dir="rtl" className="md:order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:ps-4 xl:ps-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={TRANSITION}
              className="mb-8 md:mb-16 lg:mb-20"
            >
              <div className="mb-5 flex items-center justify-between md:mb-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-secondary/40 px-3.5 py-1.5 text-[11px] font-medium text-story-purple/65 md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-story-purple" aria-hidden />
                  {WHY_US_EYEBROW}
                </span>
                <motion.span
                  key={activeIndex}
                  className="text-[11px] font-medium tabular-nums tracking-[0.12em] text-muted md:text-xs"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={TRANSITION}
                >
                  {active.number} / {String(total).padStart(2, '0')}
                </motion.span>
              </div>

              <h2
                id="why-us-heading"
                className="whitespace-pre-line text-[clamp(1.75rem,3.8vw,2.85rem)] font-extrabold leading-[1.1] tracking-tight text-text"
              >
                {WHY_US_HEADLINE}
              </h2>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.85] text-text/55 md:mt-6 md:text-base md:leading-[1.9]">
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
                            onSelect={() => selectStep(i)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </LayoutGroup>
            </div>

            <div className="mt-6 lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  id={`why-us-panel-${active.id}`}
                  role="tabpanel"
                  aria-labelledby={`why-us-tab-${active.id}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={MOBILE_PANEL_TRANSITION}
                >
                  <WhyUsProcessCard
                    item={active}
                    stepIndex={activeIndex}
                    isActive
                    variant="panel"
                    tabId={`why-us-tab-${active.id}`}
                    panelId={`why-us-panel-${active.id}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div dir="rtl" className="hidden lg:mt-12 lg:block">
          <div
            className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-2"
            role="group"
            aria-label="פירוט שלבי התהליך"
            onPointerDown={() => setPaused(true)}
          >
            {WHY_US_PRINCIPLES.map((item, i) => (
              <Fragment key={item.id}>
                <WhyUsProcessCard
                  item={item}
                  stepIndex={i}
                  isActive={i === activeIndex}
                  onSelect={() => selectStep(i)}
                  tabId={`why-us-tab-${item.id}`}
                  panelId={`why-us-panel-${item.id}`}
                />
                {i < total - 1 && (
                  <div className="flex items-center justify-center" aria-hidden>
                    <ChevronLeft className="h-3.5 w-3.5 text-story-purple/30" strokeWidth={1.5} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
