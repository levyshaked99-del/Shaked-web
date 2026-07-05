import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { MonthlyServiceScope } from './monthlyServices/MonthlyServiceScope'
import {
  MONTHLY_SERVICE_PRICE,
  MONTHLY_SERVICES_INTRO,
} from './monthlyServices/servicesMonthlyServicesData'

export function ServicesMonthlyServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="monthly-services"
      aria-labelledby="monthly-services-heading"
      className="relative overflow-hidden bg-white px-6 pb-20 pt-6 scroll-mt-24 md:px-10 md:pb-24 md:pt-8 lg:px-16 lg:pb-28"
    >
      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-gradient-to-b from-secondary/45 to-white shadow-depth-md md:rounded-[32px]"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.85, ease: EASE_PREMIUM }}
        >
          <div
            className="pointer-events-none absolute -start-24 top-0 h-48 w-48 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
            }}
            aria-hidden
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:[direction:ltr]">
            <div dir="rtl" className="flex flex-col justify-center px-7 py-9 md:px-10 md:py-11 lg:px-12 lg:py-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-story-purple/10 bg-story-purple-soft/50 px-3.5 py-1.5 text-[11px] font-medium text-story-purple/70 md:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-story-purple" aria-hidden />
                {MONTHLY_SERVICES_INTRO.label}
              </span>

              <h2
                id="monthly-services-heading"
                className="mt-6 text-[clamp(1.65rem,3.6vw,2.35rem)] font-extrabold leading-[1.12] tracking-tight text-text"
              >
                {MONTHLY_SERVICES_INTRO.heading}
              </h2>

              <p className="mt-4 text-[0.9375rem] leading-[1.85] text-text/45 md:text-base md:leading-[1.9]">
                {MONTHLY_SERVICES_INTRO.description}
              </p>

              <p className="mt-3 text-[0.8125rem] leading-relaxed text-text/40 md:text-sm">
                {MONTHLY_SERVICES_INTRO.audience}
              </p>

              <div className="mt-8 flex items-end gap-2 border-t border-black/[0.06] pt-7 md:mt-9">
                <span className="text-[clamp(2rem,4.5vw,2.75rem)] font-extrabold tabular-nums leading-none tracking-tight text-text">
                  {MONTHLY_SERVICE_PRICE.currency}
                  {MONTHLY_SERVICE_PRICE.amount}
                </span>
                <span className="mb-1 text-sm font-medium text-text/40 md:text-base">
                  {MONTHLY_SERVICE_PRICE.period}
                </span>
              </div>
            </div>

            <div dir="rtl" className="border-t border-black/[0.06] lg:border-s lg:border-t-0">
              <MonthlyServiceScope inView={inView} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
