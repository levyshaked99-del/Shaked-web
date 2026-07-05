import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { AnimatedCheckmark } from './AnimatedCheckmark'

interface IncludedClosingProps {
  inView: boolean
}

export function IncludedClosing({ inView }: IncludedClosingProps) {
  return (
    <motion.div
      className="rounded-2xl border border-black/[0.06] bg-white px-6 py-12 text-center shadow-depth-md md:rounded-[28px] md:px-10 md:py-14"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.65, delay: 0.25, ease: EASE_PREMIUM }}
    >
      <div className="mx-auto mb-8 h-px max-w-[280px] bg-black/[0.08]" aria-hidden />

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-2.5">
          <AnimatedCheckmark active={inView} delay={0.35} />
          <p className="text-base font-semibold text-text md:text-lg">הכל כלול.</p>
        </div>

        <p className="text-[0.9375rem] leading-relaxed text-text/55 md:text-base">
          עכשיו אפשר להתחיל לבנות.
        </p>

        <Link
          to="/contact"
          className="group mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg md:min-h-[52px] md:px-10"
        >
          קבל הצעת מחיר
          <ArrowLeft
            size={14}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <div className="mx-auto mt-8 h-px max-w-[280px] bg-black/[0.08]" aria-hidden />
    </motion.div>
  )
}
