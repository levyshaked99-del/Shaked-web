import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

const METRICS = [
  { label: 'קהל יעד', value: '3', sub: 'פרסונות' },
  { label: 'מתחרים', value: '5', sub: 'נותחו' },
  { label: 'מטרות', value: '4', sub: 'מוגדרות' },
]

export function StageUnderstand() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-4 md:gap-3 md:p-5" dir="rtl">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stageStagger(0, 0)}
      >
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-story-purple/55 md:text-[9px]">
            Research
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-text md:text-xs">Business Discovery</p>
        </div>
        <div className="rounded-full border border-black/[0.06] bg-secondary/60 px-2.5 py-1 text-[8px] font-medium text-text/45 md:text-[9px]">
          Phase 01
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-xl border border-black/[0.05] bg-secondary/40 p-2.5 md:p-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stageStagger(i, 0.12)}
          >
            <p className="text-[8px] text-text/40 md:text-[9px]">{m.label}</p>
            <p className="mt-1 text-lg font-extrabold tabular-nums tracking-tight text-text md:text-xl">{m.value}</p>
            <p className="text-[7px] text-text/35 md:text-[8px]">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-1 flex-col rounded-xl border border-black/[0.05] bg-white p-3 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.06)] md:p-3.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stageStagger(3, 0.2)}
      >
        <p className="text-[8px] font-semibold text-text/45 md:text-[9px]">Audience Map</p>
        <div className="mt-2.5 space-y-2">
          {[
            { w: '88%', label: 'Segment A' },
            { w: '72%', label: 'Segment B' },
            { w: '54%', label: 'Segment C' },
          ].map((bar, i) => (
            <motion.div key={bar.label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={stageStagger(i, 0.35)}>
              <div className="mb-1 flex justify-between text-[7px] text-text/35 md:text-[8px]">
                <span>{bar.label}</span>
                <span>{bar.w}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-l from-story-purple/70 to-story-purple/30"
                  initial={{ width: 0 }}
                  animate={{ width: bar.w }}
                  transition={{ ...stageStagger(i, 0.45), duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={stageStagger(4, 0.5)}
      >
        {['Goals', 'Competitors'].map((title) => (
          <div key={title} className="rounded-lg border border-dashed border-black/[0.08] bg-secondary/30 p-2.5">
            <p className="text-[7px] font-medium text-text/40 md:text-[8px]">{title}</p>
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-text/10" />
              <div className="h-1 w-4/5 rounded bg-text/08" />
              <div className="h-1 w-3/5 rounded bg-text/06" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
