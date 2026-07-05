import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { CardGlow } from '../ui/CardGlow'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { AnimatedCheckmark } from '../IncludedSection/AnimatedCheckmark'
import { MONTHLY_SERVICES } from './monthlyServicesData'

export function MonthlyServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <SectionShell ref={ref} id="maintenance" tone="bright">
      <Reveal variant="blur" className="text-center">
        <h2 className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          שירותי תחזוקה חודשיים
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-base leading-[1.75] text-text/60 md:text-lg">
          האתר הוא רק ההתחלה.
        </p>
      </Reveal>

      <motion.div
        className="group relative mx-auto mt-14 max-w-[900px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-7 shadow-depth-lg md:mt-20 md:rounded-[28px] md:p-10 lg:mt-24 lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={
          inView
            ? {
                opacity: 1,
                y: hovered ? -3 : 0,
                boxShadow: hovered
                  ? '0 24px 64px -24px rgba(0,0,0,0.14), 0 0 48px -24px rgba(37,99,235,0.08)'
                  : '0 8px 24px -8px rgba(0,0,0,0.1), 0 32px 80px -28px rgba(0,0,0,0.14)',
              }
            : { opacity: 0, y: 20 }
        }
        transition={{
          opacity: { duration: 0.65, ease: EASE_PREMIUM },
          y: { duration: 0.45, ease: EASE_PREMIUM },
          boxShadow: { duration: 0.45, ease: EASE_PREMIUM },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardGlow active={hovered} tone="blue" />

        <ul className="relative grid gap-3 sm:grid-cols-2 md:gap-4" aria-label="שירותי תחזוקה חודשיים">
          {MONTHLY_SERVICES.map((service, index) => (
            <motion.li
              key={service}
              className="flex list-none items-center justify-end gap-2.5 rounded-xl border border-black/[0.04] bg-secondary/50 px-4 py-3.5"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease: EASE_PREMIUM }}
            >
              <span className="text-[0.875rem] font-medium text-text/70 md:text-[0.9375rem]">{service}</span>
              <AnimatedCheckmark active={inView} delay={0.18 + index * 0.06} />
            </motion.li>
          ))}
        </ul>

        <p className="relative mt-8 border-t border-black/[0.06] pt-8 text-center text-[0.9375rem] leading-[1.8] text-text/55 md:text-base">
          ניתן להצטרף לשירות התחזוקה בכל שלב לאחר סיום הפרויקט.
        </p>
      </motion.div>
    </SectionShell>
  )
}
