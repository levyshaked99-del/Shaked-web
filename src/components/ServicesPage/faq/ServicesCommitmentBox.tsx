import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE_PREMIUM } from '../../../motion/easing'
import { SERVICES_COMMITMENT } from './servicesFaqData'

interface ServicesCommitmentBoxProps {
  inView: boolean
}

export function ServicesCommitmentBox({ inView }: ServicesCommitmentBoxProps) {
  return (
    <motion.aside
      className="mt-10 rounded-[28px] border border-black/[0.05] bg-secondary/40 px-6 py-8 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] md:mt-12 md:rounded-[30px] md:px-10 md:py-10 lg:px-12"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.75, delay: 0.15, ease: EASE_PREMIUM }}
      aria-labelledby="services-commitment-heading"
    >
      <h3
        id="services-commitment-heading"
        className="text-center text-lg font-bold tracking-tight text-text md:text-xl"
      >
        {SERVICES_COMMITMENT.title}
      </h3>

      <ul className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-4">
        {SERVICES_COMMITMENT.items.map((item, index) => (
          <motion.li
            key={item}
            className="flex items-start justify-end gap-3 text-end"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.04, ease: EASE_PREMIUM }}
          >
            <span className="text-[0.9375rem] leading-snug text-text/55">{item}</span>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white">
              <Check size={11} strokeWidth={2.25} className="text-text/45" aria-hidden />
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  )
}
