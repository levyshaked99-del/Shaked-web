import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'

const ITEMS = [
  { title: 'עסק', subtitle: 'לפני עיצוב' },
  { title: 'חוויה', subtitle: 'שמובילה לפעולה' },
  { title: 'נכס', subtitle: 'שנבנה לטווח ארוך' },
] as const

interface MetricItemProps {
  title: string
  subtitle: string
  delay: number
}

function MetricItem({ title, subtitle, delay }: MetricItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col gap-1 md:gap-1.5 md:transition-[transform,opacity] md:duration-300 md:ease-out md:hover:-translate-y-[3px] md:hover:opacity-90"
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
    >
      <span className="text-base font-semibold tracking-tight text-text/70 md:text-2xl md:font-bold md:text-text">
        {title}
      </span>
      <span className="max-w-[96px] text-xs leading-snug text-text/55 md:text-sm md:text-text/60">
        {subtitle}
      </span>
    </motion.div>
  )
}

export function Metrics() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-x-3 gap-y-1 border-t border-black/[0.05] pt-8 sm:flex sm:gap-7 sm:border-0 sm:pt-0 md:mt-10 md:gap-10">
      {ITEMS.map((item, index) => (
        <MetricItem key={item.title} {...item} delay={0.15 + index * 0.1} />
      ))}
    </div>
  )
}
