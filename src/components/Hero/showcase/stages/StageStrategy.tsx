import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger } from './stageMotion'

function Section({
  label,
  delay,
  children,
  className = '',
}: {
  label: string
  delay: number
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`overflow-hidden rounded border border-story-blue/20 bg-story-blue-soft/40 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...stagger(delay, 0.2), duration: 0.55 }}
    >
      <div className="flex items-center gap-1.5 border-b border-story-blue/15 px-2 py-1">
        <div className="h-1 w-1 rounded-full bg-story-blue/50" />
        <span className="text-[6.5px] font-semibold uppercase tracking-[0.14em] text-story-blue/60">{label}</span>
      </div>
      <div className="p-2">{children}</div>
    </motion.div>
  )
}

export function StageStrategy() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3 text-white">
      <Section label="Header · Navigation" delay={0}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded border border-sky-300/40 bg-sky-300/10" />
            <div className="h-1.5 w-12 rounded bg-sky-200/40" />
          </div>
          <div className="flex gap-2">
            {['בית', 'שירותים', 'אודות', 'צור קשר'].map((item, i) => (
              <motion.span
                key={item}
                className="text-[6px] text-sky-200/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </Section>

      <Section label="Hero Section" delay={1} className="flex-1">
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col justify-center gap-2">
            <motion.div className="h-2 w-3/4 rounded bg-sky-200/50" {...fadeUp} transition={stagger(2, 0.1)} />
            <motion.div className="h-2 w-1/2 rounded bg-sky-200/35" {...fadeUp} transition={stagger(3, 0.1)} />
            <motion.div className="mt-1 h-1.5 w-2/3 rounded bg-sky-200/20" {...fadeUp} transition={stagger(4, 0.1)} />
            <motion.div
              className="mt-2 inline-flex w-fit rounded-full border-2 border-sky-300/50 bg-sky-300/15 px-3 py-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={stagger(5, 0.1)}
            >
              <span className="text-[6.5px] font-medium text-sky-100/80">CTA · התחילו עכשיו</span>
            </motion.div>
          </div>
          <motion.div
            className="w-[38%] rounded border border-dashed border-sky-300/30 bg-sky-400/10"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(3, 0.15)}
          >
            <div className="flex h-full min-h-[60px] items-center justify-center">
              <span className="text-[6px] text-sky-200/35">Hero Image</span>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section label="Features · Cards" delay={2}>
        <div className="grid grid-cols-3 gap-2">
          {['יתרון 1', 'יתרון 2', 'יתרון 3'].map((title, i) => (
            <motion.div
              key={title}
              className="rounded border border-sky-300/20 bg-sky-400/[0.08] p-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(i + 6, 0.12)}
            >
              <div className="mb-1.5 h-4 w-4 rounded bg-sky-300/20" />
              <div className="h-1 w-full rounded bg-sky-200/40" />
              <div className="mt-1 h-1 w-4/5 rounded bg-sky-200/25" />
              <span className="mt-1.5 block text-[5.5px] text-sky-200/40">{title}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section label="Testimonials" delay={3}>
        <div className="flex gap-2">
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              className="flex flex-1 items-start gap-2 rounded border border-sky-300/15 bg-sky-400/[0.06] p-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={stagger(n + 8, 0.12)}
            >
              <div className="h-5 w-5 shrink-0 rounded-full border border-sky-300/30 bg-sky-300/15" />
              <div className="flex-1 space-y-1">
                <div className="h-1 w-full rounded bg-sky-200/30" />
                <div className="h-1 w-4/5 rounded bg-sky-200/20" />
                <div className="h-1 w-1/3 rounded bg-sky-200/15" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section label="Footer" delay={4}>
        <div className="flex justify-between">
          <div className="space-y-1">
            <div className="h-1 w-10 rounded bg-sky-200/30" />
            <div className="h-1 w-8 rounded bg-sky-200/15" />
          </div>
          <div className="flex gap-3">
            {['מדיניות', 'פרטיות', 'קשר'].map((l) => (
              <span key={l} className="text-[5.5px] text-sky-200/35">{l}</span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
