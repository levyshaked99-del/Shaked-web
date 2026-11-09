import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMinWidth } from '../../hooks/useMinWidth'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { GrowthShowcaseVisual } from './GrowthShowcaseVisual'
import { WEBSITE_GROWTH_BADGE, WEBSITE_GROWTH_BENEFITS } from './websiteGrowthData'
import type { WebsiteGrowthBenefit } from './websiteGrowthData'

const CROSSFADE = { duration: 0.55, ease: EASE_PREMIUM }
const AUTO_INTERVAL = 5500

function BenefitFeatures({ benefit }: { benefit: WebsiteGrowthBenefit }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 md:mt-10 md:grid-cols-2 lg:grid-cols-2">
      {benefit.features.map((feature) => {
        const Icon = feature.icon
        return (
          <li key={feature.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.05] bg-secondary/50">
              <Icon size={14} strokeWidth={1.5} className="text-text/45" aria-hidden />
            </span>
            <span className="text-sm font-medium leading-snug text-text/60">{feature.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

function BenefitCopy({ benefit }: { benefit: WebsiteGrowthBenefit }) {
  return (
    <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={benefit.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE}
          className="min-w-0"
        >
          <h2
            id="website-growth-heading"
            className="text-[clamp(1.75rem,3.8vw,2.85rem)] font-extrabold leading-[1.1] tracking-tight text-text"
          >
            {benefit.showcaseHeadline}
          </h2>
          <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.85] text-text/65 md:mt-6 md:text-base md:leading-[1.9]">
            {benefit.description}
          </p>
          <BenefitFeatures benefit={benefit} />
        </motion.div>
      </AnimatePresence>
    </div>
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
                <SectionEyebrow as="span" lang="he">
                  {WEBSITE_GROWTH_BADGE}
                </SectionEyebrow>
                <span className="text-[11px] font-medium tabular-nums tracking-[0.12em] text-muted md:text-xs">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.span
                      key={benefit.number}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CROSSFADE}
                      className="inline-block"
                    >
                      {benefit.number} / {String(total).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              <BenefitCopy benefit={benefit} />
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
