import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionShell } from '../ui/SectionShell'

export function FinalCTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionShell
      ref={ref}
      id="contact"
      tone="soft"
      className="pb-32 pt-28 md:pb-44 md:pt-36 lg:pb-52 lg:pt-40"
      glow="violet"
    >
      <motion.div
        className="mx-auto max-w-[720px] text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 1, ease: EASE_PREMIUM }}
      >
        <div className="mx-auto mb-12 h-px w-12 bg-story-purple/25" aria-hidden />

        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.025em] text-text">
          בואו נבנה את האתר הבא שלכם.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-base leading-[1.85] text-text/42">
          שיחה קצרה. ללא התחייבות. רק הבנה.
        </p>

        <Link
          to="/contact"
          className="group mt-12 inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-accent px-11 py-4 text-sm font-semibold text-white transition-all duration-500 hover:bg-text/90 md:mt-14 md:min-h-[56px] md:px-12"
        >
          קבלו הצעת מחיר
          <ArrowLeft
            size={15}
            strokeWidth={2}
            className="transition-transform duration-500 group-hover:-translate-x-1"
            aria-hidden
          />
        </Link>
      </motion.div>
    </SectionShell>
  )
}
