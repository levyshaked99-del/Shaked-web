import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionShell } from '../ui/SectionShell'
import { MANIFESTO_BEATS, MANIFESTO_CLOSER } from './differentiatorsData'

const SLOW = { duration: 1.1, ease: EASE_PREMIUM }

function ManifestoLine({ statement, index }: { statement: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <motion.div
      ref={ref}
      className="relative py-12 md:py-16 lg:py-20"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ ...SLOW, delay: index * 0.06 }}
    >
      <motion.span
        className="pointer-events-none absolute inset-y-0 end-0 w-px bg-story-purple/0"
        animate={inView ? { backgroundColor: 'rgba(124, 58, 237, 0.12)' } : {}}
        transition={{ duration: 1.4, delay: 0.2 }}
        aria-hidden
      />
      <p className="text-end text-[clamp(1.85rem,4.8vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-text">
        {statement}
      </p>
    </motion.div>
  )
}

export function DifferentiatorsSection() {
  const ref = useRef<HTMLElement>(null)
  const headerInView = useInView(ref, { once: true, margin: '-80px' })
  const closerRef = useRef<HTMLParagraphElement>(null)
  const closerInView = useInView(closerRef, { once: true, margin: '-20%' })

  return (
    <SectionShell
      ref={ref}
      id="differentiators"
      tone="soft"
      className="py-28 md:py-40 lg:py-48"
      glow="violet"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white via-white/95 to-transparent md:h-72"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-[880px] text-end"
        initial={{ opacity: 0, y: 28 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={SLOW}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-story-purple/70 md:text-xs">
          הגישה שלנו
        </span>
        <h2 className="mt-8 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text">
          מה מבדיל אותנו
        </h2>
        <p className="mt-8 max-w-[520px] ms-auto text-[1.05rem] leading-[1.85] text-text/45 md:text-lg md:leading-[1.9]">
          אנחנו לא בונים אתרים יפים.
          <br />
          אנחנו בונים נכסים דיגיטליים עם כוונה.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-16 max-w-[880px] md:mt-24 lg:mt-28">
        <div className="border-t border-black/[0.06]" aria-hidden />
        {MANIFESTO_BEATS.map((beat, index) => (
          <div key={beat.id}>
            <ManifestoLine statement={beat.statement} index={index} />
            {index < MANIFESTO_BEATS.length - 1 && (
              <div className="border-t border-black/[0.05]" aria-hidden />
            )}
          </div>
        ))}
        <div className="border-t border-black/[0.06]" aria-hidden />

        <motion.p
          ref={closerRef}
          className="mt-16 text-end text-[clamp(1.1rem,2.2vw,1.35rem)] font-medium leading-relaxed tracking-tight text-story-purple/60 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={closerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...SLOW, delay: 0.15 }}
        >
          {MANIFESTO_CLOSER}
        </motion.p>
      </div>
    </SectionShell>
  )
}
