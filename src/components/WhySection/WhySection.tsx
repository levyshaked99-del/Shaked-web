import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { staggerContainer } from '../../motion/variants'
import { SectionShell } from '../ui/SectionShell'
import { TrustSignals } from '../ui/TrustSignals'
import { ProcessCard } from './ProcessCard'
import { ProcessFlowLinks } from './ProcessFlowLinks'
import { PROCESS_CARDS } from './processCardsData'

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_PREMIUM },
  },
}

export function WhySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionShell
      ref={ref}
      id="why"
      tone="soft"
      className="pt-20 md:pt-28 lg:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white/90 to-transparent md:h-64"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-[760px] text-center"
        variants={staggerContainer(0.14, 0.05)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={headerItem} className="mb-6 md:mb-8">
          <span className="inline-flex items-center rounded-full border border-story-blue/20 bg-story-blue-soft px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand md:text-xs">
            הגישה שלנו
          </span>
        </motion.div>

        <motion.h2
          variants={headerItem}
          className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text"
        >
          למה עסקים בוחרים לעבוד איתנו?
        </motion.h2>

        <motion.p
          variants={headerItem}
          className="mx-auto mt-6 max-w-[640px] text-base leading-[1.85] text-text/60 md:mt-8 md:text-lg md:leading-[1.9]"
        >
          אנחנו לא מוכרים רק אתר יפה.
          <br className="hidden sm:block" />
          אנחנו בונים נכס דיגיטלי שמתחיל בהבנת העסק, ממשיך באסטרטגיה מדויקת ומסתיים באתר
          שמייצג אתכם בצורה מקצועית ומייצר תוצאות.
        </motion.p>
      </motion.div>

      <div className="relative mt-20 md:mt-28 lg:mt-32">
        <ProcessFlowLinks inView={inView} />

        <div className="relative grid auto-rows-fr gap-7 md:grid-cols-2 md:grid-rows-2 md:gap-8 lg:gap-10">
          {PROCESS_CARDS.map((card, index) => (
            <ProcessCard key={card.id} card={card} index={index} inView={inView} />
          ))}
        </div>
      </div>

      <TrustSignals inView={inView} delay={0.45} className="mt-16 md:mt-24 lg:mt-28" compact />
    </SectionShell>
  )
}
