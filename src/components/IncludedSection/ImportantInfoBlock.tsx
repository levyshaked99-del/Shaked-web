import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { IMPORTANT_INFO_ITEMS } from './importantInfoData'

interface ImportantInfoBlockProps {
  inView: boolean
  delay?: number
}

export function ImportantInfoBlock({ inView, delay = 0 }: ImportantInfoBlockProps) {
  return (
    <motion.div
      className="rounded-2xl border border-black/[0.05] bg-white/70 px-6 py-8 md:rounded-[24px] md:px-10 md:py-10"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
    >
      <div className="flex items-center justify-end gap-3">
        <h3 className="text-lg font-bold tracking-tight text-text md:text-xl">חשוב לדעת</h3>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-secondary">
          <Info size={16} strokeWidth={1.75} className="text-text/45" aria-hidden />
        </div>
      </div>

      <ul className="mt-6 space-y-4" aria-label="מידע חשוב">
        {IMPORTANT_INFO_ITEMS.map((item, index) => (
          <motion.li
            key={item}
            className="flex list-none items-start justify-end gap-3 text-end"
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.45, delay: delay + 0.1 + index * 0.07, ease: EASE_PREMIUM }}
          >
            <span className="text-[0.875rem] leading-[1.8] text-text/55 md:text-[0.9375rem]">
              {item}
            </span>
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text/25"
              aria-hidden
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
