import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE_PREMIUM } from '../../../motion/easing'
import { WebsitePreviewFrame } from './previews/WebsitePreviewFrame'
import { ACCENT_STYLES, type WebsiteTypeCardData } from './websiteTypesData'

interface WebsiteTypeCardProps {
  card: WebsiteTypeCardData
  index: number
  inView: boolean
}

export function WebsiteTypeCard({ card, index, inView }: WebsiteTypeCardProps) {
  const styles = ACCENT_STYLES[card.accent]

  return (
    <motion.article
      className="group flex h-full flex-col rounded-[28px] border border-black/[0.05] bg-white p-3 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-700 hover:shadow-depth-lg md:rounded-[30px] md:p-3.5 lg:p-4"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.85, delay: 0.12 + index * 0.1, ease: EASE_PREMIUM }}
      whileHover={{ y: -6 }}
    >
      <div className="overflow-hidden rounded-[20px] border border-black/[0.05] bg-[#F4F4F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:rounded-[22px]">
        <div className="aspect-[16/11] w-full origin-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.015] sm:aspect-[5/3]">
          <WebsitePreviewFrame crop={card.previewCrop} />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-1 pb-1 pt-7 text-center md:px-2 md:pt-8 lg:pt-9">
        <span
          className={`rounded-full border px-3 py-0.5 text-[10px] font-medium tracking-[0.12em] md:text-[11px] ${styles.badge}`}
        >
          {card.badge}
        </span>

        <h3 className="mt-4 text-[1.3rem] font-bold leading-[1.12] tracking-tight text-text md:text-[1.4rem] lg:text-[1.55rem]">
          {card.title}
        </h3>

        <p className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] md:text-[11px] ${styles.subtitle}`}>
          {card.subtitle}
        </p>

        <p className="mt-3.5 max-w-[15rem] text-[0.8125rem] leading-[1.8] text-text/40 md:max-w-[16rem] md:text-[0.875rem]">
          {card.description}
        </p>

        <Link
          to={card.href}
          className={`group/btn mt-7 inline-flex min-h-[44px] w-full max-w-[16rem] items-center justify-center gap-2 rounded-full border bg-white px-5 py-2.5 text-[0.8125rem] font-medium transition-all duration-500 hover:-translate-y-px md:mt-8 md:text-sm ${styles.button}`}
        >
          זה מתאים לי
          <ArrowLeft
            size={14}
            strokeWidth={1.75}
            className="text-current opacity-45 transition-transform duration-500 group-hover/btn:-translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </motion.article>
  )
}
