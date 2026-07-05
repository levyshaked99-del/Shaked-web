import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionShell } from '../ui/SectionShell'
import { TESTIMONIALS } from './testimonialsData'

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionShell ref={ref} id="testimonials" tone="bright" className="py-28 md:py-40 lg:py-48" glow="none">
      <motion.div
        className="mx-auto max-w-[720px] text-end"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.95, ease: EASE_PREMIUM }}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-story-purple/70 md:text-xs">
          אמון
        </span>
        <h2 className="mt-8 text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-text">
          מה הלקוחות אומרים
        </h2>
      </motion.div>

      <div className="mx-auto mt-24 grid max-w-[1040px] gap-16 md:mt-32 md:grid-cols-3 lg:mt-36 lg:gap-20">
        {TESTIMONIALS.map((item, index) => (
          <motion.blockquote
            key={item.id}
            className="flex h-full flex-col border-t border-black/[0.07] pt-10 text-end"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.85, delay: 0.2 + index * 0.12, ease: EASE_PREMIUM }}
          >
            <p className="flex-1 text-[1rem] leading-[1.95] text-text/50 md:text-[1.05rem]">
              &ldquo;{item.quote}&rdquo;
            </p>

            <footer className="mt-10">
              <cite className="not-italic">
                <span className="block text-sm font-semibold text-text/80">{item.name}</span>
                <span className="mt-1.5 block text-xs text-text/35">{item.role}</span>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </SectionShell>
  )
}
