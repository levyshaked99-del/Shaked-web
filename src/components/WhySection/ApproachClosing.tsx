import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'

interface ApproachClosingProps {
  inView: boolean
}

export function ApproachClosing({ inView }: ApproachClosingProps) {
  return (
    <motion.div
      className="relative mx-auto mt-20 max-w-[720px] text-center md:mt-28 lg:mt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.75, delay: 0.55, ease: EASE_PREMIUM }}
    >
      <div className="mx-auto mb-10 h-px max-w-[120px] bg-black/[0.08]" aria-hidden />

      <h3 className="mx-auto max-w-[640px] text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-[1.25] tracking-tight text-text">
        זו הסיבה שהאתרים שלנו לא רק נראים טוב — הם עובדים.
      </h3>

      <p className="mx-auto mt-6 max-w-[580px] text-[0.9375rem] leading-[1.85] text-text/55 md:text-base md:leading-[1.9]">
        כל החלטה, החל מהאפיון ועד לשורת הקוד האחרונה, מתקבלת מתוך מטרה אחת:
        <br className="hidden sm:block" />
        לבנות אתר שמייצג את העסק שלכם בצורה מקצועית ומסייע לו לצמוח לאורך זמן.
      </p>

      <Link
        to="/contact"
        className="group mt-10 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-accent px-9 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-depth-lg md:min-h-[52px] md:px-10"
      >
        קבלו הצעת מחיר
        <ArrowLeft
          size={14}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden
        />
      </Link>

      <div className="mx-auto mt-10 h-px max-w-[120px] bg-black/[0.08]" aria-hidden />
    </motion.div>
  )
}
