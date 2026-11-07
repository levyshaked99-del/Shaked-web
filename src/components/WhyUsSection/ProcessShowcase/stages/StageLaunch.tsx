import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

interface StageProps {
  motionEnabled?: boolean
}

const QA_ITEMS = [
  { label: 'רספונסיביות', detail: 'מובייל · טאבלט · דסקטופ' },
  { label: 'ביצועים', detail: 'טעינה · תמונות · קוד' },
  { label: 'נגישות', detail: 'מקלדת · ניגוד · מבנה' },
]

export function StageLaunch({ motionEnabled = true }: StageProps) {
  const s = (i: number, base = 0) => stageStagger(i, base, motionEnabled)

  return (
    <div className="relative flex h-full flex-col p-4 md:p-5" dir="rtl">
      <motion.div
        className="mb-3 flex items-center justify-between"
        initial={motionEnabled ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={s(0, 0)}
      >
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-story-purple/65 md:text-[9px]">
            השקה
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-text md:text-xs">בקרת איכות</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-secondary/50 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-story-purple" />
          <span className="text-[7px] font-medium text-text/50 md:text-[8px]">מוכן לעלייה</span>
        </div>
      </motion.div>

      <motion.div
        className="relative flex-1 overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
        initial={motionEnabled ? { opacity: 0, scale: 0.98 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={s(1, 0.1)}
      >
        <div className="border-b border-black/[0.05] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-text" />
            <div className="h-1.5 w-16 rounded bg-text/15" />
          </div>
        </div>
        <div className="p-3 md:p-4">
          <motion.p
            className="text-[12px] font-extrabold leading-tight text-text md:text-[13px]"
            initial={motionEnabled ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={s(2, 0.2)}
          >
            האתר
            <br />
            <span className="text-story-purple">עולה לאוויר.</span>
          </motion.p>
          <motion.ul
            className="mt-3 space-y-2"
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={s(3, 0.3)}
          >
            {QA_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2 rounded-lg border border-black/[0.05] bg-secondary/40 p-2"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Check className="h-2.5 w-2.5 text-story-purple" strokeWidth={2.5} aria-hidden />
                </span>
                <div>
                  <p className="text-[8px] font-semibold text-text/75 md:text-[9px]">{item.label}</p>
                  <p className="text-[7px] text-text/40 md:text-[8px]">{item.detail}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        {motionEnabled && (
          <motion.div
            className="pointer-events-none absolute"
            animate={{
              left: ['28%', '62%', '45%', '28%'],
              top: ['38%', '52%', '44%', '38%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
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
        )}
      </motion.div>

      <motion.div
        className="mt-2.5 flex flex-wrap gap-2"
        initial={motionEnabled ? { opacity: 0, y: 6 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={s(4, 0.45)}
      >
        {['בדיקות', 'אופטימיזציה', 'ליווי'].map((tag) => (
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
