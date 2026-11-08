import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { ServicesCommitmentBox } from './faq/ServicesCommitmentBox'
import { ServicesFaqAccordion } from './faq/ServicesFaqAccordion'
import { SERVICES_FAQ_INTRO } from './faq/servicesFaqData'

export function ServicesFaqSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-white px-6 pb-20 pt-24 scroll-mt-24 md:px-10 md:pb-24 md:pt-28 lg:px-16 lg:pb-28 lg:pt-32"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <span className="text-[11px] font-semibold tracking-[0.18em] text-text/55 md:text-xs">
            {SERVICES_FAQ_INTRO.label}
          </span>

          <h2
            id="faq-heading"
            className="mt-6 text-[clamp(1.85rem,4vw,3rem)] font-extrabold leading-[1.12] tracking-tight text-text"
          >
            {SERVICES_FAQ_INTRO.heading}
          </h2>
        </motion.header>

        <div className="mx-auto mt-14 max-w-[820px] md:mt-16 lg:mt-20">
          <ServicesFaqAccordion inView={inView} />
          <ServicesCommitmentBox inView={inView} />
        </div>
      </div>
    </section>
  )
}
