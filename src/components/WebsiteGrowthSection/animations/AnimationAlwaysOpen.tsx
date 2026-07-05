import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

export function AnimationAlwaysOpen({ active }: Props) {
  const { x, y, w, h } = PANEL
  const cx = x + w / 2
  const cy = y + h / 2 - 8
  const r = 72
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [active])

  const minuteAngle = ((22 + seconds / 60) % 60) * 6 - 90
  const hourAngle = ((21 + seconds / 3600) % 12) * 30 - 90

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full" fill="none" aria-hidden>
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={ILLU.radius}
        fill={ILLU.panel}
        stroke={ILLU.inkFaint}
        strokeWidth={ILLU.stroke}
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: ILLU.ease }}
      />

      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={ILLU.ink}
        strokeOpacity={0.12}
        strokeWidth={1.5}
        fill="none"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.7, ease: ILLU.ease, delay: 0.1 }}
      />

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180)
        const x1 = cx + Math.cos(angle) * (r - 8)
        const y1 = cy + Math.sin(angle) * (r - 8)
        const x2 = cx + Math.cos(angle) * (r - (i % 3 === 0 ? 18 : 12))
        const y2 = cy + Math.sin(angle) * (r - (i % 3 === 0 ? 18 : 12))
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ILLU.ink} strokeOpacity={i % 3 === 0 ? 0.25 : 0.1} strokeWidth={1.2} />
        )
      })}

      <motion.line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos((hourAngle * Math.PI) / 180) * 36}
        y2={cy + Math.sin((hourAngle * Math.PI) / 180) * 36}
        stroke={ILLU.ink}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos((minuteAngle * Math.PI) / 180) * 52}
        y2={cy + Math.sin((minuteAngle * Math.PI) / 180) * 52}
        stroke={ILLU.accent}
        strokeWidth={1.8}
        strokeLinecap="round"
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <circle cx={cx} cy={cy} r={3.5} fill={ILLU.ink} fillOpacity={0.8} />

      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 0.35, ease: ILLU.ease }}
      >
        <rect x={cx - 36} y={cy + r + 18} width={72} height={22} rx={11} fill={ILLU.accentSoft} />
        <text x={cx} y={cy + r + 33} textAnchor="middle" fill={ILLU.accent} fontSize={10} fontWeight={600} fontFamily="Heebo, sans-serif">
          24/7
        </text>
      </motion.g>
    </svg>
  )
}
