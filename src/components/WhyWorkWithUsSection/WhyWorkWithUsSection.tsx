import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionShell } from '../ui/SectionShell'
import { VALUE_HEADLINE, VALUE_PILLARS, VALUE_SUBLINE } from './whyWorkData'

const SLOW = { duration: 0.95, ease: EASE_PREMIUM }

function ValuePillarBlock({ pillar, index }: { pillar: (typeof VALUE_PILLARS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <motion.div
      ref={ref}
      className="group text-end"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ ...SLOW, delay: index * 0.05 }}
    >
      <span
        className="mb-5 inline-block h-px w-8 bg-story-purple/25 transition-all duration-700 group-hover:w-12 group-hover:bg-story-purple/40"
        aria-hidden
      />
      <h3 className="text-[clamp(1.15rem,2vw,1.4rem)] font-bold leading-snug tracking-tight text-text">
        {pillar.title}
      </h3>
      <p className="mt-3 text-[0.875rem] leading-[1.75] text-text/42 md:text-[0.9375rem]">{pillar.whisper}</p>
    </motion.div>
  )
}

export function WhyWorkWithUsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionShell
      ref={ref}
      id="why-us"
      tone="soft"
      className="py-28 md:py-40 lg:py-48"
      glow="violet"
    >
      <motion.div
        className="mx-auto max-w-[780px] text-end"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={SLOW}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-story-purple/70 md:text-xs">
          הערך שלכם
        </span>
        <h2 className="mt-8 text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-text">
          למה לעבוד איתנו
        </h2>
        <p className="mt-10 text-[clamp(1.35rem,2.8vw,2rem)] font-bold leading-[1.25] tracking-tight text-text">
          {VALUE_HEADLINE}
        </p>
        <p className="mt-6 max-w-[560px] ms-auto text-base leading-[1.9] text-text/45 md:text-lg">
          {VALUE_SUBLINE}
        </p>
      </motion.div>

      <div className="mx-auto mt-24 grid max-w-[960px] gap-16 sm:grid-cols-2 md:mt-32 lg:mt-36 lg:gap-x-20 lg:gap-y-20">
        {VALUE_PILLARS.map((pillar, index) => (
          <ValuePillarBlock key={pillar.id} pillar={pillar} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}
