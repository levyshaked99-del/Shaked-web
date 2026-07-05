import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EASE_PREMIUM } from '../../motion/easing'
import { SectionShell } from '../ui/SectionShell'
import { WEBSITE_TYPE_ROWS } from './websiteTypesData'

const SLOW = { duration: 0.55, ease: EASE_PREMIUM }

export function WebsiteTypesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionShell ref={ref} id="packages" tone="bright" className="py-28 md:py-40 lg:py-48" glow="none">
      <motion.div
        className="mx-auto max-w-[900px] text-end"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.95, ease: EASE_PREMIUM }}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-story-purple/70 md:text-xs">
          הפתרונות
        </span>
        <h2 className="mt-8 text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-text">
          איזה אתר מתאים לכם?
        </h2>
        <p className="mt-6 max-w-[440px] ms-auto text-base leading-[1.85] text-text/42 md:text-lg">
          שלושה כיוונים. פרטים מלאים בדף השירות.
        </p>
      </motion.div>

      <div className="mx-auto mt-20 max-w-[900px] md:mt-28 lg:mt-32">
        <div className="border-t border-black/[0.07]" aria-hidden />
        {WEBSITE_TYPE_ROWS.map((row, index) => (
          <WebsiteTypeRow key={row.id} row={row} index={index} sectionInView={inView} />
        ))}
      </div>
    </SectionShell>
  )
}

function WebsiteTypeRow({
  row,
  index,
  sectionInView,
}: {
  row: (typeof WEBSITE_TYPE_ROWS)[number]
  index: number
  sectionInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.85, delay: 0.15 + index * 0.12, ease: EASE_PREMIUM }}
    >
      <Link
        to={row.href}
        className="group relative block border-b border-black/[0.07] py-12 md:py-16 lg:py-[4.5rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex items-start gap-8 md:gap-12">
            <motion.span
              className="pt-1.5 text-[11px] font-medium tabular-nums tracking-[0.22em] text-text/20"
              animate={{ color: hovered ? 'rgba(124, 58, 237, 0.45)' : 'rgba(17, 17, 17, 0.2)' }}
              transition={SLOW}
              aria-hidden
            >
              {row.number}
            </motion.span>

            <div className="text-end">
              <motion.h3
                className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-text"
                animate={{
                  letterSpacing: hovered ? '-0.03em' : '-0.02em',
                  color: hovered ? 'rgba(17, 17, 17, 0.92)' : 'rgba(17, 17, 17, 1)',
                }}
                transition={SLOW}
              >
                {row.title}
              </motion.h3>
              <motion.p
                className="mt-3 text-[0.9375rem] leading-relaxed text-text/40 md:text-base"
                animate={{ color: hovered ? 'rgba(17, 17, 17, 0.55)' : 'rgba(17, 17, 17, 0.4)' }}
                transition={SLOW}
              >
                {row.description}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8 ps-12 md:flex-col md:items-end md:gap-4 md:ps-0">
            <motion.span
              className="text-[1.05rem] font-semibold tabular-nums tracking-tight text-text/55 md:text-lg"
              animate={{ color: hovered ? 'rgba(17, 17, 17, 0.85)' : 'rgba(17, 17, 17, 0.55)' }}
              transition={SLOW}
            >
              {row.price}
            </motion.span>

            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-text/35">
              מידע נוסף
              <motion.span
                animate={{ x: hovered ? -6 : 0, color: hovered ? 'rgba(124, 58, 237, 0.7)' : 'rgba(17, 17, 17, 0.35)' }}
                transition={SLOW}
              >
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
              </motion.span>
            </span>
          </div>
        </div>

        <motion.span
          className="absolute inset-x-0 bottom-0 h-px origin-right bg-story-purple/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={SLOW}
          aria-hidden
        />
      </Link>
    </motion.div>
  )
}
