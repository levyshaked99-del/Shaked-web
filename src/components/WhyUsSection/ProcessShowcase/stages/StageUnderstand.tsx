import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

const PILLARS = [
  { label: 'קהל יעד', items: ['פרסונה ראשית', 'צרכים', 'נקודות כאב'] },
  { label: 'מטרות', items: ['המרה', 'אמון', 'מיצוב'] },
  { label: 'מתחרים', items: ['מיפוי', 'פערים', 'הזדמנויות'] },
]

interface StageProps {
  motionEnabled?: boolean
}

export function StageUnderstand({ motionEnabled = true }: StageProps) {
  const s = (i: number, base = 0) => stageStagger(i, base, motionEnabled)

  return (
    <div className="flex h-full flex-col gap-2.5 p-4 md:gap-3 md:p-5" dir="rtl">
      <motion.div
        className="flex items-center justify-between"
        initial={motionEnabled ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={s(0, 0)}
      >
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-story-purple/60 md:text-[9px]">
            מחקר
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-text md:text-xs">הבנת העסק</p>
        </div>
        <div className="rounded-full border border-black/[0.06] bg-secondary/60 px-2.5 py-1 text-[8px] font-medium text-text/45 md:text-[9px]">
          שלב 01
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        {PILLARS.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-xl border border-black/[0.05] bg-secondary/40 p-2.5 md:p-3"
            initial={motionEnabled ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={s(i, 0.12)}
          >
            <p className="text-[8px] font-semibold text-text/55 md:text-[9px]">{m.label}</p>
            <ul className="mt-2 space-y-1">
              {m.items.map((item) => (
                <li key={item} className="text-[7px] text-text/40 md:text-[8px]">
                  · {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-1 flex-col rounded-xl border border-black/[0.05] bg-white p-3 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.06)] md:p-3.5"
        initial={motionEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={s(3, 0.2)}
      >
        <p className="text-[8px] font-semibold text-text/45 md:text-[9px]">היררכיית מידע</p>
        <div className="mt-2.5 space-y-2">
          {[
            { w: '88%', label: 'מסר ראשי' },
            { w: '72%', label: 'ערך ללקוח' },
            { w: '54%', label: 'פעולה ראשית' },
          ].map((bar, i) => (
            <motion.div
              key={bar.label}
              initial={motionEnabled ? { opacity: 0, x: 8 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={s(i, 0.35)}
            >
              <div className="mb-1 flex justify-between text-[7px] text-text/40 md:text-[8px]">
                <span>{bar.label}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-l from-story-purple/70 to-story-purple/30"
                  initial={motionEnabled ? { width: 0 } : false}
                  animate={{ width: bar.w }}
                  transition={{ ...s(i, 0.45), duration: motionEnabled ? 0.8 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
