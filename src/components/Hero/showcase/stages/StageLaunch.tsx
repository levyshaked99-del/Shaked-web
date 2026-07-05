import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type NicheId = 'realestate' | 'law' | 'restaurant'

export const launchSites: NicheId[] = ['realestate', 'law', 'restaurant']

function RealEstateHero() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#050505] text-white">
      <nav className="relative z-20 flex items-center justify-between px-5 py-3" aria-hidden>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm border border-white/25" />
          <span className="text-[8px] font-semibold tracking-[0.28em]">AURA</span>
        </div>
        <div className="flex gap-4">
          {['נכסים', 'אדריכלות', 'יועצים', 'צור קשר'].map((item) => (
            <span key={item} className="text-[6.5px] tracking-wide text-white/40">{item}</span>
          ))}
        </div>
      </nav>

      <div className="relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2838] via-[#0c1218] to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_8%,rgba(180,210,240,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_90%,rgba(40,60,80,0.35),transparent_55%)]" />

        <div className="absolute bottom-0 left-1/2 h-[78%] w-[96%] -translate-x-1/2">
          <div className="absolute bottom-0 left-[2%] h-[95%] w-[38%] overflow-hidden rounded-t-[2px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1018] via-[#1e3040] to-[#3a5568]" />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]" />
            <div className="absolute inset-x-[8%] top-[10%] grid grid-cols-4 gap-[3px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-[1px]"
                  style={{
                    background: `linear-gradient(180deg, rgba(180,210,230,${0.06 + (i % 3) * 0.04}) 0%, rgba(80,120,150,0.04) 100%)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 right-[0%] h-[82%] w-[36%] overflow-hidden rounded-t-[2px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-[#152028] to-[#2a4050]" />
            <div className="absolute inset-0 bg-[linear-gradient(75deg,transparent_30%,rgba(255,255,255,0.05)_45%,transparent_55%)]" />
          </div>
          <div className="absolute bottom-0 left-[36%] h-[62%] w-[22%] rounded-t-[1px] bg-gradient-to-t from-[#0c1418] to-[#243848] opacity-90" />
          <div className="absolute bottom-0 left-1/2 h-[8%] w-[80%] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-xl" />
        </div>

        <div className="absolute right-[14%] top-[10%] h-6 w-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-300/80 shadow-[0_0_40px_rgba(251,230,160,0.35)]" />

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/92 to-transparent px-5 pb-5 pt-16">
          <p className="text-[6.5px] uppercase tracking-[0.32em] text-white/30">נדל&quot;ן יוקרה · תל אביב</p>
          <div className="mt-1.5 text-[13px] font-bold leading-[1.04] tracking-[-0.02em]">
            מרחבים
            <br />
            <span className="font-light text-white/85">שמגדירים סטנדרט</span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            {[
              { n: '12', l: 'נכסים' },
              { n: '4', l: 'ערים' },
              { n: '18', l: 'שנות ניסיון' },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col">
                <span className="text-[9px] font-semibold tabular-nums">{n}</span>
                <span className="text-[5.5px] text-white/30">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[6.5px] backdrop-blur-md">
            <span>גלו את הנכסים</span>
            <span className="text-white/40">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LawHero() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#f8f8f8]">
      <nav className="relative z-10 flex items-center justify-between px-5 py-3" aria-hidden>
        <span className="text-[8px] font-bold tracking-[0.2em] text-[#0f0f1a]">STERN & CO.</span>
        <div className="flex gap-4">
          {['תחומי עיסוק', 'צוות', 'תוצאות', 'קשר'].map((item) => (
            <span key={item} className="text-[6.5px] text-[#0f0f1a]/35">{item}</span>
          ))}
        </div>
      </nav>

      <div className="relative flex-1 px-5 pb-5">
        <div className="absolute inset-x-5 top-0 h-[58%] overflow-hidden rounded-2xl bg-[#0f0f1a]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#12121f] to-[#080810]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#f8f8f8] to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-[70%] w-[45%] -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/80 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-[85%] w-[70%] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-[#2a2a40] to-[#1a1a28]" />
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[6.5px] uppercase tracking-[0.24em] text-[#0f0f1a]/25">משרד עורכי דין · יוקרה</p>
          <div className="mt-1.5 text-[13px] font-bold leading-[1.04] tracking-[-0.02em] text-[#0f0f1a]">
            ייצוג משפטי
            <br />
            <span className="font-light text-[#0f0f1a]/75">ברמה הגבוהה ביותר</span>
          </div>
          <div className="mt-2.5 flex gap-3">
            {['15+ שנות ניסיון', '98% הצלחה'].map((tag) => (
              <span key={tag} className="rounded-full border border-[#0f0f1a]/8 px-2.5 py-1 text-[5.5px] text-[#0f0f1a]/45">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 inline-flex rounded-full bg-[#0f0f1a] px-4 py-1.5 text-[6.5px] font-medium text-white">
            קביעת פגישה
          </div>
        </div>
      </div>
    </div>
  )
}

function RestaurantHero() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#060403] text-[#f2ebe3]">
      <nav className="relative z-10 flex items-center justify-between px-5 py-3" aria-hidden>
        <span className="text-[8px] font-semibold tracking-[0.26em] text-[#c9a87c]">NOMA TLV</span>
        <div className="flex gap-4">
          {['תפריט', 'שף', 'חוויה', 'הזמנות'].map((item) => (
            <span key={item} className="text-[6.5px] text-[#f2ebe3]/35">{item}</span>
          ))}
        </div>
      </nav>

      <div className="relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-[#120a06] via-[#0a0705] to-[#030201]" />
        <div className="absolute left-1/2 top-0 h-[65%] w-[55%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,124,0.18),transparent_65%)]" />

        <div className="absolute left-1/2 top-[22%] -translate-x-1/2">
          <div className="relative h-[72px] w-[72px] rounded-full border border-[#c9a87c]/20 bg-[#0a0806] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-[#2a1810] to-[#1a1008]" />
            <div className="absolute left-[35%] top-[30%] h-3 w-3 rounded-full bg-[#c9a87c]/60" />
            <div className="absolute right-[28%] top-[40%] h-2 w-5 rotate-[-20deg] rounded-full bg-emerald-800/50" />
            <div className="absolute bottom-[32%] left-[28%] h-1.5 w-4 rotate-[15deg] rounded-full bg-amber-700/40" />
          </div>
          <div className="absolute -bottom-1 left-1/2 h-3 w-[90%] -translate-x-1/2 rounded-full bg-black/40 blur-md" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#060403] via-[#060403]/90 to-transparent px-5 pb-5 pt-14">
          <p className="text-[6.5px] uppercase tracking-[0.28em] text-[#c9a87c]/40">מסעדת שף · תל אביב</p>
          <div className="mt-1.5 text-[13px] font-bold leading-[1.04] tracking-[-0.02em]">
            חוויה קולינרית
            <br />
            <span className="font-light text-[#f2ebe3]/80">ברמה עולמית</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c9a87c]/25 bg-[#c9a87c]/5 px-4 py-1.5 text-[6.5px] text-[#c9a87c]">
            <span>הזמינו שולחן</span>
            <span className="opacity-50">·</span>
            <span className="text-[#c9a87c]/60">א&apos;–ש&apos; 19:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const heroes: Record<NicheId, () => ReactNode> = {
  realestate: RealEstateHero,
  law: LawHero,
  restaurant: RestaurantHero,
}

interface StageLaunchProps {
  activeIndex: number
}

export function StageLaunch({ activeIndex }: StageLaunchProps) {
  const id = launchSites[activeIndex]
  const Hero = heroes[id]

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: [0, 0.12, 0], x: ['-100%', '100%', '100%'] }}
        transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
        }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Hero />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
