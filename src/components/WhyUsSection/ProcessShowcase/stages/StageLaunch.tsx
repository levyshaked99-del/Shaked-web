import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

export function StageLaunch() {
  return (
    <div className="relative flex h-full flex-col p-4 md:p-5" dir="rtl">
      <motion.div
        className="mb-3 flex items-center justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stageStagger(0, 0)}
      >
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-story-green/70 md:text-[9px]">
            Live
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-text md:text-xs">Production Ready</p>
        </div>
        <motion.div
          className="flex items-center gap-1.5 rounded-full border border-story-green/20 bg-story-green-soft/60 px-2.5 py-1"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-story-green" />
          <span className="text-[7px] font-medium text-story-green md:text-[8px]">Online</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex-1 overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={stageStagger(1, 0.1)}
      >
        <div className="border-b border-black/[0.05] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-text" />
            <div className="h-1.5 w-16 rounded bg-text/15" />
          </div>
        </div>
        <div className="p-3 md:p-4">
          <motion.div
            className="text-[12px] font-extrabold leading-tight text-text md:text-[13px]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stageStagger(2, 0.2)}
          >
            Your site,
            <br />
            <span className="text-story-purple">live.</span>
          </motion.div>
          <motion.div
            className="mt-3 grid grid-cols-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stageStagger(3, 0.3)}
          >
            {[
              { label: 'Performance', val: '98' },
              { label: 'SEO', val: 'A+' },
              { label: 'Uptime', val: '99.9%' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="text-[7px] text-text/35 md:text-[8px]">{s.label}</p>
                <p className="mt-0.5 text-sm font-bold tabular-nums text-text">{s.val}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute"
          animate={{
            left: ['28%', '62%', '45%', '28%'],
            top: ['38%', '52%', '44%', '38%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 12 14" className="h-3 w-3 drop-shadow-md">
            <path
              d="M0 0 L0 10 L3 7.5 L5 12 L6 11 L4 6.5 L7.5 6.5 Z"
              fill="#111"
              stroke="white"
              strokeWidth="0.7"
            />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-2.5 flex gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stageStagger(4, 0.45)}
      >
        {['QA', 'Optimize', 'Support'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/[0.06] bg-secondary/40 px-2.5 py-1 text-[7px] font-medium text-text/45 md:text-[8px]"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
