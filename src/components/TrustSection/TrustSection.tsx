import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { TrustDetailAnimation } from './TrustDetailAnimation'
import { TrustNotificationsAnimation } from './TrustNotificationsAnimation'
import { TrustTimelineAnimation } from './TrustTimelineAnimation'
import { TRUST_PANELS } from './trustData'

const ANIMATIONS = [
  TrustTimelineAnimation,
  TrustDetailAnimation,
  TrustNotificationsAnimation,
] as const

interface TrustPanelProps {
  title: string
  description: string
  textFirst: boolean
  animation: (typeof ANIMATIONS)[number]
  index: number
}

function TrustPanel({ title, description, textFirst, animation: Animation, index }: TrustPanelProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <article
      ref={ref}
      className="grid min-h-[600px] grid-cols-1 lg:min-h-[650px] lg:grid-cols-2 xl:min-h-[700px] lg:[direction:ltr]"
    >
      <PanelText
        title={title}
        description={description}
        panelNumber={index + 1}
        inView={inView}
        className={textFirst ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'}
      />
      <PanelAnimation
        inView={inView}
        index={index}
        className={textFirst ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1'}
      >
        <Animation active={inView} />
      </PanelAnimation>
    </article>
  )
}

function PanelText({
  title,
  description,
  panelNumber,
  inView,
  className,
}: {
  title: string
  description: string
  panelNumber: number
  inView: boolean
  className?: string
}) {
  return (
    <motion.div
      dir="rtl"
      className={`flex flex-col justify-center px-2 py-16 lg:px-10 lg:py-20 xl:px-14 ${className ?? ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: EASE_PREMIUM }}
    >
      <span className="mb-6 text-[11px] font-semibold tracking-[0.18em] text-story-purple/65 md:text-xs">
        {String(panelNumber).padStart(2, '0')}
      </span>
      <h3 className="text-[clamp(1.65rem,3.2vw,2.35rem)] font-bold leading-[1.15] tracking-tight text-text">
        {title}
      </h3>
      <p className="mt-6 max-w-md text-base leading-[1.9] text-text/48 md:text-[1.05rem] md:leading-[1.95]">
        {description}
      </p>
    </motion.div>
  )
}

function PanelAnimation({
  children,
  inView,
  index,
  className,
}: {
  children: ReactNode
  inView: boolean
  index: number
  className?: string
}) {
  return (
    <motion.div
      className={`relative flex min-h-[320px] items-center lg:min-h-0 ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.12 + index * 0.05, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}

export function TrustSection() {
  const ref = useRef<HTMLElement>(null)
  const headerInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="trust"
      className="relative overflow-hidden bg-white px-6 py-28 md:px-10 md:py-36 lg:px-16 lg:py-44"
    >
      <motion.div
        dir="rtl"
        className="relative mx-auto mb-20 max-w-[1100px] text-end md:mb-28 lg:mb-32"
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: EASE_PREMIUM }}
      >
        <span className="text-[11px] font-semibold tracking-[0.18em] text-story-purple/70 md:text-xs">
          אמון
        </span>
        <h2 className="mt-8 text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-text">
          לעבוד איתנו זה להרגיש בידיים טובות
        </h2>
        <p className="mt-5 max-w-[480px] ms-auto text-base leading-[1.85] text-text/42 md:text-lg">
          מקצועיות, שקיפות וליווי — מהרגע הראשון ועד לאוויר.
        </p>
      </motion.div>

      <div className="mx-auto max-w-[1100px] divide-y divide-black/[0.06]">
        {TRUST_PANELS.map((panel, index) => (
          <TrustPanel
            key={panel.id}
            title={panel.title}
            description={panel.description}
            textFirst={panel.textFirst}
            animation={ANIMATIONS[index]}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
