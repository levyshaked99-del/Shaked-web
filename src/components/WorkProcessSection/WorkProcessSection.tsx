import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { CONTACT_TIMELINE } from '../ContactSection/contactTimelineData'

function TimelineStep({
  number,
  title,
  index,
  inView,
}: {
  number: string
  title: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65, delay: 0.2 + index * 0.1, ease: EASE_PREMIUM }}
    >
      <span
        className="text-[clamp(2.25rem,4.5vw,3rem)] font-extrabold tabular-nums leading-none tracking-tight text-text/[0.07]"
        aria-hidden
      >
        {number}
      </span>
      <span className="mt-3 text-sm font-semibold tracking-tight text-text md:text-[0.9375rem]">{title}</span>
    </motion.div>
  )
}

export function WorkProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionShell ref={ref} id="work-process" tone="soft">
      <Reveal variant="blur" className="text-center">
        <span className="inline-flex items-center rounded-full border border-story-blue/20 bg-story-blue-soft px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand md:text-xs">
          תהליך העבודה
        </span>
        <h2 className="mx-auto mt-6 max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          מהרעיון ועד לאתר חי
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-base leading-[1.75] text-text/60 md:text-lg">
          תהליך ברור, שקוף וליווי אישי בכל שלב.
        </p>
      </Reveal>

      <div className="relative mt-16 md:mt-20 lg:mt-24">
        <div
          className="pointer-events-none absolute inset-x-[10%] top-[1.75rem] hidden h-px bg-gradient-to-l from-transparent via-black/[0.08] to-transparent md:block"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute inset-x-[10%] top-[1.75rem] hidden h-px origin-right bg-brand/20 md:block"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_PREMIUM }}
          aria-hidden
        />

        <div className="relative grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-4">
          {CONTACT_TIMELINE.map((step, index) => (
            <TimelineStep key={step.number} {...step} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
