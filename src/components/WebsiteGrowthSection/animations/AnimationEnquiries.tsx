import { motion } from 'framer-motion'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

export function AnimationEnquiries({ active }: Props) {
  const { x, y, w, h } = PANEL
  const inboxX = x + w / 2 - 60
  const inboxY = y + h - 90

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
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: ILLU.ease }}
      />

      {[0, 1, 2].map((i) => (
        <motion.rect
          key={`msg-${i}`}
          x={120 + i * 8}
          width={80}
          height={28}
          rx={6}
          fill={ILLU.panel}
          stroke={ILLU.ink}
          strokeOpacity={0.1}
          strokeWidth={1}
          initial={{ opacity: 0, y: y + 50 + i * 10 }}
          animate={active ? { opacity: [0, 1, 0.4], y: [y + 50 + i * 10, y + 90 + i * 8, inboxY - 8] } : { opacity: 0, y: y + 50 }}
          transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: ILLU.ease }}
        />
      ))}

      <motion.rect
        x={inboxX}
        y={inboxY}
        width={120}
        height={72}
        rx={10}
        fill={ILLU.ink}
        fillOpacity={0.03}
        stroke={ILLU.ink}
        strokeOpacity={0.12}
        strokeWidth={1.2}
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 0.55, ease: ILLU.ease }}
      />

      {[0, 1, 2].map((i) => (
        <motion.rect
          key={`in-${i}`}
          x={inboxX + 14}
          y={inboxY + 16 + i * 14}
          width={92 - i * 12}
          height={3}
          rx={1.5}
          fill={ILLU.accent}
          fillOpacity={0.35 + i * 0.15}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.85 + i * 0.1, ease: ILLU.ease }}
          style={{ transformOrigin: `${inboxX + 14}px center` }}
        />
      ))}

      <motion.circle
        cx={inboxX + 108}
        cy={inboxY + 12}
        r={8}
        fill={ILLU.accent}
        initial={{ scale: 0 }}
        animate={active ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 1.1 }}
      />
      <motion.text
        x={inboxX + 108}
        y={inboxY + 15}
        textAnchor="middle"
        fill="white"
        fontSize={9}
        fontWeight={700}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.15 }}
      >
        3
      </motion.text>
    </svg>
  )
}
