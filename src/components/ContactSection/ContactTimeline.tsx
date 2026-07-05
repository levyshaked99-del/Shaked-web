import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { Reveal } from '../ui/Reveal'
import { CONTACT_TIMELINE } from './contactTimelineData'

function TimelineStep({ number, title, index }: { number: string; title: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE_PREMIUM }}
    >
      <span className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tabular-nums leading-none tracking-tight text-text/[0.08]" aria-hidden>
        {number}
      </span>
      <span className="mt-3 text-sm font-semibold tracking-tight text-text md:text-[0.9375rem]">
        {title}
      </span>
    </motion.div>
  )
}

export function ContactTimeline() {
  return (
    <section className="border-t border-black/[0.05] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mb-16 text-center md:mb-20">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted">איך זה עובד</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-text">
            מהרעיון ועד לאתר חי
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-4">
          <div
            className="pointer-events-none absolute inset-x-[12%] top-[1.75rem] hidden h-px bg-gradient-to-l from-transparent via-black/[0.08] to-transparent md:block"
            aria-hidden
          />
          {CONTACT_TIMELINE.map((step, index) => (
            <TimelineStep key={step.number} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
