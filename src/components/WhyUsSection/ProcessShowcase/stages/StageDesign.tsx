import { motion } from 'framer-motion'
import { stageStagger } from './stageMotion'

const SWATCHES = ['#111111', '#7C3AED', '#F7F7F7', '#FFFFFF']

interface StageProps {
  motionEnabled?: boolean
}

export function StageDesign({ motionEnabled = true }: StageProps) {
  const s = (i: number, base = 0) => stageStagger(i, base, motionEnabled)

  return (
    <div className="flex h-full overflow-hidden" dir="ltr">
      <motion.div
        className="flex w-[30%] shrink-0 flex-col border-e border-black/[0.05] bg-secondary/50"
        initial={motionEnabled ? { opacity: 0, x: -10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={s(0, 0)}
      >
        <div className="border-b border-black/[0.05] px-3 py-2">
          <p className="text-[8px] font-semibold tracking-[0.12em] text-text/35 md:text-[9px]">
            מערכת עיצוב
          </p>
        </div>
        <div className="space-y-3 p-3">
          <div>
            <p className="text-[7px] font-medium text-text/35 md:text-[8px]">צבעים</p>
            <div className="mt-1.5 flex gap-1.5">
              {SWATCHES.map((hex, i) => (
                <motion.div
                  key={hex}
                  className="h-5 w-5 rounded-md border border-black/[0.08] shadow-sm"
                  style={{ background: hex }}
                  initial={motionEnabled ? { opacity: 0, scale: 0.8 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={s(i, 0.15)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[7px] font-medium text-text/35 md:text-[8px]">טיפוגרפיה</p>
            <motion.p
              className="mt-1 text-xl font-extrabold leading-none text-text"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={s(4, 0.25)}
            >
              א
            </motion.p>
            <p className="mt-0.5 text-[7px] text-text/35">Heebo · Bold</p>
          </div>
          <div className="space-y-1.5">
            <motion.div
              className="rounded-md bg-text py-1.5 text-center text-[7px] font-medium text-white md:text-[8px]"
              initial={motionEnabled ? { width: '70%' } : false}
              animate={{ width: '100%' }}
              transition={
                motionEnabled
                  ? { delay: 0.5, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0 }
              }
            >
              ראשי
            </motion.div>
            <div className="rounded-md border border-black/[0.08] py-1.5 text-center text-[7px] text-text/45 md:text-[8px]">
              משני
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative flex min-w-0 flex-1 flex-col bg-white p-3 md:p-4" dir="rtl">
        <motion.div
          className="flex-1 overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)]"
          initial={motionEnabled ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={s(1, 0.12)}
        >
          <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-text" />
              <span className="text-[8px] font-bold tracking-wide text-text md:text-[9px]">מותג</span>
            </div>
            <div className="flex gap-2">
              {['בית', 'עבודות', 'צור קשר'].map((l) => (
                <span key={l} className="text-[7px] text-text/30 md:text-[8px]">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 md:p-4">
            <motion.h3
              className="text-[13px] font-extrabold leading-tight tracking-tight text-text md:text-sm"
              initial={motionEnabled ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={s(2, 0.25)}
            >
              חוויה
              <br />
              <span className="font-medium text-text/65">מעוצבת</span>
            </motion.h3>
            <motion.p
              className="mt-1.5 max-w-[75%] text-[7px] leading-relaxed text-text/40 md:text-[8px]"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={s(3, 0.32)}
            >
              רספונסיבי · קוד נקי
            </motion.p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[1, 2].map((c) => (
                <motion.div
                  key={c}
                  className="rounded-lg border border-black/[0.05] bg-secondary/40 p-2"
                  initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={s(c + 3, 0.38)}
                >
                  <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-story-purple/10 via-secondary to-white" />
                  <div className="mt-1.5 h-1 w-3/4 rounded bg-text/12" />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-[7px] font-semibold text-white md:text-[8px]"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={s(5, 0.42)}
            >
              צור קשר
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-5 end-4 rounded-lg border border-black/[0.06] bg-white/95 px-2.5 py-1.5 shadow-depth-sm backdrop-blur-sm"
          initial={motionEnabled ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={s(5, 0.55)}
        >
          <p className="text-[7px] font-medium text-story-purple md:text-[8px]">פיתוח · רספונסיבי</p>
        </motion.div>
      </div>
    </div>
  )
}
