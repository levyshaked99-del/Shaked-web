import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { staggerContainer, staggerItemBlur } from '../../motion/variants'
import { Metrics } from './Metrics'

export function HeroContent() {
  return (
    <motion.div
      className="flex flex-col justify-center px-6 pb-10 pt-28 md:px-10 md:pb-16 md:pt-32 lg:ps-[4.5rem] lg:pe-10"
      variants={staggerContainer(0.1, 0.55)}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={staggerItemBlur}
        className="mb-5 text-sm font-medium tracking-wide text-muted"
      >
        אנחנו הופכים נכסים דיגיטליים למנועי צמיחה.
      </motion.p>

      <motion.h1
        variants={staggerItemBlur}
        className="max-w-md text-[clamp(2.15rem,4.2vw,3.65rem)] font-extrabold leading-[1.08] tracking-tight text-text"
      >
        אתר מצוין
        <br />
        גורם לאנשים
        <br />
        לבחור בך.
      </motion.h1>

      <motion.p
        variants={staggerItemBlur}
        className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-text/65 md:text-base"
      >
        אנחנו מתכננים, מעצבים ומפתחים אתרים שעוזרים לעסקים לבלוט, לבנות אמון
        ולהפוך יותר מבקרים ללקוחות.
      </motion.p>

      <motion.div variants={staggerItemBlur} className="mt-7 flex flex-wrap items-center gap-3.5">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
        >
          קבלו הצעת מחיר
          <ArrowLeft
            size={14}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-brand/80"
            aria-hidden
          />
        </Link>

        <Link
          to="/services"
          className="inline-flex items-center rounded-full border border-accent bg-white px-7 py-3.5 text-sm font-semibold text-text transition-all duration-300 hover:border-brand/30 hover:shadow-depth-sm"
        >
          סוגי אתרים
        </Link>
      </motion.div>

      <motion.div variants={staggerItemBlur}>
        <Metrics />
      </motion.div>
    </motion.div>
  )
}
