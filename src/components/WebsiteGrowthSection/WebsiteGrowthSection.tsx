import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMinWidth } from '../../hooks/useMinWidth'
import { EASE_PREMIUM } from '../../motion/easing'
import { GrowthShowcaseVisual } from './GrowthShowcaseVisual'
import { WEBSITE_GROWTH_BADGE, WEBSITE_GROWTH_BENEFITS } from './websiteGrowthData'
import type { WebsiteGrowthBenefit } from './websiteGrowthData'

const TRANSITION = { duration: 0.65, ease: EASE_PREMIUM }
const AUTO_INTERVAL = 5500

function BenefitFeatures({ benefit, animated }: { benefit: WebsiteGrowthBenefit; animated: boolean }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 md:mt-10 md:grid-cols-2 lg:grid-cols-2">
      {benefit.features.map((feature, index) => {
        const Icon = feature.icon
        const content = (
          <>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.05] bg-secondary/50">
              <Icon size={14} strokeWidth={1.5} className="text-text/45" aria-hidden />
            </span>
            <span className="text-sm font-medium leading-snug text-text/60">{feature.label}</span>
          </>
        )

        if (!animated) {
          return (
            <li key={feature.label} className="flex items-start gap-3">
              {content}
            </li>
          )
        }

        return (
          <motion.li
            key={feature.label}
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.08 + index * 0.05 }}
          >
            {content}
          </motion.li>
        )
      })}
    </ul>
  )
}

function BenefitCopy({ benefit, animated }: { benefit: WebsiteGrowthBenefit; animated: boolean }) {
  const inner = (
    <>
      <h2
        id="website-growth-heading"
        className="text-[clamp(1.75rem,3.8vw,2.85rem)] font-extrabold leading-[1.1] tracking-tight text-text"
      >
        {benefit.showcaseHeadline}
      </h2>
      <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.85] text-text/65 md:mt-6 md:text-base md:leading-[1.9]">
        {benefit.description}
      </p>
      <BenefitFeatures benefit={benefit} animated={animated} />
    </>
  )

  if (!animated) {
    return (
      <div key={benefit.id}>
        {inner}
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={benefit.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={TRANSITION}
      >
        {inner}
      </motion.div>
    </AnimatePresence>
  )
}

export function WebsiteGrowthSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-20%' })
  const isDesktop = useMinWidth(1024)
  const total = WEBSITE_GROWTH_BENEFITS.length
  const benefit = WEBSITE_GROWTH_BENEFITS[activeIndex]

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (!isDesktop || !inView || paused) return
    const timer = setInterval(goNext, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [isDesktop, inView, paused, goNext, activeIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return
      if (e.key === 'ArrowLeft') goNext()
      if (e.key === 'ArrowRight') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, goNext, goPrev])

  return (
    <section
      ref={sectionRef}
      id="website-growth"
      className="relative overflow-hidden bg-white px-6 py-28 md:px-10 md:py-36 lg:px-16 lg:py-40"
      aria-labelledby="website-growth-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:[direction:ltr]">
          <div className="hidden lg:block lg:col-start-1 lg:row-start-1">
            <GrowthShowcaseVisual
              benefitId={benefit.id}
              hubLabel={benefit.hubLabel}
              hubSubtitle={benefit.hubSubtitle}
              cards={benefit.cards}
              active={inView}
              animate={isDesktop}
            />
          </div>

          <div
            dir="rtl"
            className="flex flex-col lg:col-start-2 lg:row-start-1 lg:min-h-[480px] lg:justify-between"
          >
            <div>
              <div className="mb-8 flex items-center justify-between md:mb-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-secondary/40 px-3.5 py-1.5 text-[11px] font-medium text-story-purple md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-story-purple" aria-hidden />
                  {WEBSITE_GROWTH_BADGE}
                </span>
                <span className="text-[11px] font-medium tabular-nums tracking-[0.12em] text-muted md:text-xs">
                  {benefit.number} / {String(total).padStart(2, '0')}
                </span>
              </div>

              <BenefitCopy benefit={benefit} animated />
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 md:mt-12 lg:mt-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="יתרון קודם"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-text/60 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-black/[0.14] hover:text-text"
                >
                  <ChevronRight size={16} strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="יתרון הבא"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-text text-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-text/90"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
