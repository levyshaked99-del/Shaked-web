import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { WebsiteTypeCard } from './websiteTypes/WebsiteTypeCard'
import { WEBSITE_TYPE_CARDS, WEBSITE_TYPES_INTRO } from './websiteTypes/websiteTypesData'

export function ServicesWebsiteFitSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="website-fit"
      aria-labelledby="website-fit-heading"
      className="relative overflow-hidden bg-white px-6 pb-10 pt-28 scroll-mt-24 md:px-10 md:pb-12 md:pt-32 lg:px-16 lg:pb-14 lg:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-secondary to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <span className="text-[11px] font-semibold tracking-[0.18em] text-text/40 md:text-xs">
            {WEBSITE_TYPES_INTRO.label}
          </span>

          <h2
            id="website-fit-heading"
            className="mt-6 whitespace-pre-line text-[clamp(1.85rem,4vw,3.15rem)] font-extrabold leading-[1.12] tracking-tight text-text"
          >
            {WEBSITE_TYPES_INTRO.heading}
          </h2>
        </motion.header>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-7 lg:mt-24 lg:grid-cols-3 lg:gap-10">
          {WEBSITE_TYPE_CARDS.map((card, index) => (
            <div
              key={card.id}
              className={index === 2 ? 'md:col-span-2 md:max-w-md md:justify-self-center lg:col-span-1 lg:max-w-none' : undefined}
            >
              <WebsiteTypeCard card={card} index={index} inView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
