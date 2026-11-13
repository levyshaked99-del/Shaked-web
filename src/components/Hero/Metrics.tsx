import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'

const ITEMS = [
  { title: '0 ₪', subtitle: 'עד שרואים הדמיה' },
  { title: '21 יום', subtitle: 'עד שהאתר באוויר' },
  { title: 'שעה אחת', subtitle: 'מהזמן שלכם' },
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
      className="group flex min-w-0 flex-col gap-1.5 px-2.5 text-start sm:px-0 md:gap-2 md:transition-[transform,opacity] md:duration-300 md:ease-out md:hover:-translate-y-[3px] md:hover:opacity-90"
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
    >
      <span className="whitespace-nowrap text-[1.05rem] font-bold tabular-nums tracking-tight text-text sm:text-lg md:text-2xl md:font-extrabold md:leading-none">
        {title}
      </span>
      <span className="min-w-0 text-pretty text-[11px] font-medium leading-[1.5] tracking-[0.01em] text-muted md:text-xs md:leading-[1.55] md:text-text/55">
        {subtitle}
      </span>
    </motion.div>
  )
}

export function Metrics() {
  return (
    <div
      className="mt-10 grid grid-cols-3 divide-x divide-black/[0.06] border-t border-black/[0.06] pt-7 sm:mt-11 sm:flex sm:gap-9 sm:divide-x-0 sm:border-0 sm:pt-0 md:mt-12 md:gap-11"
      aria-label="זמנים ועלויות בשקיפות"
    >
      {ITEMS.map((item, index) => (
        <MetricItem key={item.title} {...item} delay={0.15 + index * 0.1} />
      ))}
    </div>
  )
}
