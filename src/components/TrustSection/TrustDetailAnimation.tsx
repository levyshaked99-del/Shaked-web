import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE_OUT, EASE_PREMIUM } from '../../motion/easing'

const PURPLE = '#7C3AED'

const HOTSPOTS = [
  { id: 'spacing', label: 'ריווח', x: '18%', y: '28%', delay: 0.6 },
  { id: 'type', label: 'טיפוגרפיה', x: '52%', y: '22%', delay: 1.0 },
  { id: 'button', label: 'יישור כפתורים', x: '72%', y: '58%', delay: 1.4 },
  { id: 'icons', label: 'אייקונים', x: '28%', y: '68%', delay: 1.8 },
  { id: 'responsive', label: 'התאמה לנייד', x: '82%', y: '38%', delay: 2.2 },
] as const

interface TrustDetailAnimationProps {
  active: boolean
}

export function TrustDetailAnimation({ active }: TrustDetailAnimationProps) {
  const [lensX, setLensX] = useState(12)

  useEffect(() => {
    if (!active) {
      setLensX(12)
      return
    }

    const start = performance.now()
    const duration = 3200

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      setLensX(12 + eased * 76)
      if (t < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active])

  return (
    <div className="flex h-full w-full items-center justify-center px-4 md:px-6">
      <div className="relative aspect-[4/3] w-full max-w-[420px]">
        {/* Mockup frame */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl border border-black/[0.08] bg-white"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        >
          <div className="flex items-center gap-1.5 border-b border-black/[0.05] px-4 py-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-black/[0.06]" />
            ))}
          </div>
          <div className="space-y-3 p-5">
            <div className="mx-auto h-2 w-16 rounded-full bg-black/[0.05]" />
            <div className="mt-4 h-8 rounded-md bg-black/[0.04]" />
            <div className="ms-auto h-2 w-[70%] rounded bg-black/[0.04]" />
            <div className="ms-auto h-2 w-[55%] rounded bg-black/[0.03]" />
            <div className="mt-6 ms-auto h-7 w-20 rounded-full bg-text/[0.88]" />
            <div className="mt-4 flex justify-end gap-2">
              <div className="h-12 w-12 rounded-lg border border-black/[0.05] bg-black/[0.02]" />
              <div className="h-12 w-12 rounded-lg border border-black/[0.05] bg-black/[0.02]" />
            </div>
          </div>
        </motion.div>

        {/* Hotspot highlights */}
        {HOTSPOTS.map((spot) => (
          <motion.div
            key={spot.id}
            className="pointer-events-none absolute z-10"
            style={{ right: spot.x, top: spot.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, delay: spot.delay, ease: EASE_OUT }}
          >
            <span
              className="absolute -inset-3 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
            />
            <span className="relative block h-2 w-2 rounded-full border border-story-purple/30 bg-story-purple-soft" />
            <span className="absolute end-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-story-purple/70">
              {spot.label}
            </span>
          </motion.div>
        ))}

        {/* Magnifying glass */}
        <motion.div
          className="pointer-events-none absolute top-[18%] z-20"
          style={{ right: `${lensX}%`, transform: 'translateX(50%)' }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
            <circle cx="24" cy="24" r="14" stroke={PURPLE} strokeWidth="1.25" strokeOpacity="0.5" fill="white" fillOpacity="0.85" />
            <line x1="34" y1="34" x2="46" y2="46" stroke={PURPLE} strokeWidth="1.5" strokeOpacity="0.45" strokeLinecap="round" />
            <circle cx="24" cy="24" r="9" stroke={PURPLE} strokeWidth="0.75" strokeOpacity="0.2" fill="none" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
