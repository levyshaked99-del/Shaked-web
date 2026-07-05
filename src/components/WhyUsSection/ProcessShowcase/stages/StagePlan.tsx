import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

export function StagePlan() {
  return (
    <div className="flex h-full flex-col p-4 md:p-5" dir="rtl">
      <motion.div
        className="mb-3 flex items-center justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stageStagger(0, 0)}
      >
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-story-purple/55 md:text-[9px]">
            Wireframes
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-text md:text-xs">Structure & UX</p>
        </div>
        <div className="flex gap-1">
          {['Mobile', 'Desktop'].map((v, i) => (
            <span
              key={v}
              className={`rounded-md px-2 py-0.5 text-[7px] font-medium md:text-[8px] ${
                i === 1 ? 'bg-text text-white' : 'bg-secondary text-text/40'
              }`}
            >
              {v}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-secondary/30"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={stageStagger(1, 0.1)}
      >
        <div className="flex items-center gap-2 border-b border-black/[0.05] bg-white px-3 py-2">
          <div className="h-2 w-2 rounded-sm border border-text/20 bg-text/10" />
          <div className="h-1.5 w-14 rounded bg-text/15" />
          <div className="ms-auto flex gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-1 w-6 rounded bg-text/10" />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-3">
          <motion.div
            className="rounded-lg border-2 border-dashed border-text/15 bg-white p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stageStagger(2, 0.2)}
          >
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-2.5 w-3/4 rounded bg-text/12" />
                <div className="h-2 w-1/2 rounded bg-text/08" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-text/06" />
                <div className="mt-2 h-5 w-20 rounded-full border-2 border-text/20 bg-text/05" />
              </div>
              <div className="flex w-[38%] items-center justify-center rounded border border-dashed border-text/15 bg-secondary/50">
                <span className="text-[7px] text-text/25">IMG</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid flex-1 grid-cols-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stageStagger(3, 0.35)}
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-lg border border-dashed border-text/12 bg-white p-2">
                <div className="mb-2 h-4 w-4 rounded bg-text/08" />
                <div className="h-1 w-full rounded bg-text/10" />
                <div className="mt-1 h-1 w-4/5 rounded bg-text/06" />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="h-8 rounded-lg border border-dashed border-text/10 bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stageStagger(4, 0.45)}
          />
        </div>
      </motion.div>
    </div>
  )
}
