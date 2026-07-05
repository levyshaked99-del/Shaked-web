import { motion } from 'framer-motion'
import { MessageCircle, Search, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EASE_OUT, EASE_PREMIUM } from '../../motion/easing'

interface IncludedIllustrationProps {
  active: boolean
  activeItemId?: string | null
}

const CHECK_ITEMS = [
  { id: 'brief', label: 'אפיון' },
  { id: 'design', label: 'עיצוב' },
  { id: 'mobile', label: 'מובייל' },
  { id: 'seo', label: 'SEO' },
  { id: 'launch', label: 'השקה' },
]

const ICON_ITEMS = [
  { id: 'mobile', Icon: Smartphone, x: '12%', y: '18%' },
  { id: 'seo', Icon: Search, x: '78%', y: '22%' },
  { id: 'whatsapp', Icon: MessageCircle, x: '84%', y: '68%' },
]

function isCheckComplete(itemId: string, activeItemId: string | null | undefined, active: boolean) {
  if (!active) return false
  const order = CHECK_ITEMS.map((c) => c.id)
  const activeIndex = activeItemId ? order.indexOf(activeItemId) : order.length - 1
  const itemIndex = order.indexOf(itemId)
  if (itemIndex === -1) return active
  return itemIndex <= Math.max(activeIndex, 2)
}

export function IncludedIllustration({ active, activeItemId }: IncludedIllustrationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }

    const start = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active])

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={
        active
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 24, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.7, delay: 0.12, ease: EASE_PREMIUM }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 shadow-depth-lg md:rounded-[28px] md:p-6">
        {/* Browser chrome */}
        <div className="mb-4 flex items-center gap-2 border-b border-black/[0.05] pb-4">
          <div className="flex gap-1.5" aria-hidden>
            {['#E8E8E8', '#E8E8E8', '#E8E8E8'].map((color, i) => (
              <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="mx-auto flex h-7 flex-1 max-w-[200px] items-center justify-center rounded-md bg-secondary px-3">
            <span className="truncate text-[10px] text-text/35">your-business.co.il</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-text/40">התקדמות הפרויקט</span>
            <motion.span
              className="text-[10px] font-semibold tabular-nums text-brand"
              animate={{ opacity: active ? 1 : 0.4 }}
            >
              {progress}%
            </motion.span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.04]">
            <motion.div
              className="h-full rounded-full bg-accent-progress"
              initial={{ width: '0%' }}
              animate={{ width: active ? '100%' : '0%' }}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT }}
            />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative grid grid-cols-[1fr_1.1fr] gap-4">
          {/* Checklist */}
          <div className="space-y-2.5 rounded-xl border border-black/[0.05] bg-secondary/60 p-3.5">
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-text/35">
              שלבי בנייה
            </span>
            {CHECK_ITEMS.map((item, i) => {
              const done = isCheckComplete(item.id, activeItemId, active)
              const highlighted = activeItemId === item.id

              return (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-end gap-2"
                  initial={{ opacity: 0, x: 6 }}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.1, ease: EASE_PREMIUM }}
                >
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      highlighted ? 'text-text' : done ? 'text-text/60' : 'text-text/35'
                    }`}
                  >
                    {item.label}
                  </span>
                  <motion.span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                    animate={{
                      borderColor: done ? 'rgba(22,163,74,0.3)' : 'rgba(17,17,17,0.08)',
                      backgroundColor: done ? 'rgba(220,252,231,0.6)' : 'transparent',
                    }}
                    transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  >
                    <motion.svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <motion.path
                        d="M1.5 4.2 L3.2 5.9 L6.5 2.5"
                        stroke="#16A34A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: done ? 1 : 0 }}
                        transition={{ duration: 0.35, delay: done ? 0.1 : 0, ease: EASE_OUT }}
                      />
                    </motion.svg>
                  </motion.span>
                </motion.div>
              )
            })}
          </div>

          {/* Browser preview mock */}
          <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-white">
            <div className="border-b border-black/[0.04] px-3 py-2">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-black/[0.06]" />
            </div>
            <div className="space-y-2 p-3">
              <motion.div
                className="h-8 rounded-md bg-gradient-to-l from-story-blue/10 to-story-purple/5"
                animate={{ opacity: active ? 1 : 0.5 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded bg-black/[0.04]"
                  initial={{ width: '70%' }}
                  animate={{ width: active ? `${85 - i * 12}%` : '70%', opacity: active ? 0.5 - i * 0.08 : 0.25 }}
                  transition={{ duration: 0.6, delay: 0.55 + i * 0.08, ease: EASE_PREMIUM }}
                  style={{ marginInlineStart: 'auto' }}
                />
              ))}
              <motion.div
                className="mt-3 h-5 w-16 rounded-md bg-accent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={active ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.85, ease: EASE_PREMIUM }}
                style={{ marginInlineStart: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Floating feature icons */}
        {ICON_ITEMS.map(({ id, Icon, x, y }, i) => {
          const isHighlighted =
            activeItemId === id || (active && !activeItemId && id === 'mobile')

          return (
            <motion.div
              key={id}
              className="absolute flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-depth-sm"
              style={{ right: x, top: y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                active
                  ? {
                      opacity: isHighlighted ? 1 : 0.55,
                      scale: 1,
                      y: isHighlighted ? -2 : 0,
                      boxShadow: isHighlighted
                        ? '0 4px 16px -4px rgba(37,99,235,0.18)'
                        : '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -2px rgba(0,0,0,0.06)',
                    }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.45, delay: 0.6 + i * 0.12, ease: EASE_PREMIUM }}
            >
              <Icon
                size={16}
                strokeWidth={1.75}
                className={isHighlighted ? 'text-brand' : 'text-text/40'}
                aria-hidden
              />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
