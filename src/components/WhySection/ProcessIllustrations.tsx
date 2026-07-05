import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { STORY } from '../../design/storyColors'
import { EASE_OUT, EASE_PREMIUM } from '../../motion/easing'

interface IllustrationProps {
  active?: boolean
  inView?: boolean
}

function useAnimatedScore(active: boolean, target: number) {
  const [value, setValue] = useState(target - 8)

  useEffect(() => {
    const end = active ? target : target - 8
    const start = value
    const startTime = performance.now()
    const duration = 900

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target])

  return value
}

/** 01 — Research & discovery */
export function IllustrationUnderstand({ active, inView }: IllustrationProps) {
  const live = active || inView
  const chartPoints = 'M 52 118 L 72 108 L 92 112 L 112 98 L 132 102'
  const audienceCard = { x: 32, y: 36, w: 88, h: 84, rx: 6 }

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" aria-hidden>
      <motion.rect
        x="24"
        y="128"
        width="272"
        height="44"
        rx="4"
        fill="#f3f3f3"
        stroke={STORY.blue.DEFAULT}
        strokeOpacity={live ? 0.12 : 0.06}
        animate={{ strokeOpacity: live ? 0.14 : 0.06 }}
        transition={{ duration: 0.45 }}
      />

      <motion.g animate={{ y: active ? -2 : 0 }} transition={{ duration: 0.45 }}>
        <rect
          x={audienceCard.x}
          y={audienceCard.y}
          width={audienceCard.w}
          height={audienceCard.h}
          rx={audienceCard.rx}
          fill="white"
          stroke={STORY.blue.DEFAULT}
          strokeOpacity={live ? 0.22 : 0.1}
        />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={48 + i * 22}
            cy={68}
            r="4"
            fill={STORY.blue.soft}
            stroke={STORY.blue.DEFAULT}
            strokeWidth="0.75"
            strokeOpacity={live ? 0.35 : 0.15}
            animate={{ scale: active ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 1.2, delay: i * 0.15, repeat: active ? Infinity : 0 }}
          />
        ))}
      </motion.g>

      <motion.g animate={{ y: active ? -1 : 0 }} transition={{ duration: 0.45, delay: 0.03 }}>
        <rect x="128" y="40" width="72" height="76" rx="5" fill={STORY.blue.soft} fillOpacity="0.35" stroke={STORY.blue.DEFAULT} strokeOpacity="0.12" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="138" y={62 + i * 16} width="52" height="6" rx="1" fill="#111" fillOpacity="0.05" />
            <motion.rect
              x="138"
              y={62 + i * 16}
              width={28 + i * 8}
              height="6"
              rx="1"
              fill={STORY.blue.DEFAULT}
              fillOpacity={live ? 0.28 + i * 0.05 : 0.14 + i * 0.03}
              animate={{ width: live ? 36 + i * 10 : 28 + i * 8 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          </g>
        ))}
      </motion.g>

      <motion.g animate={{ y: active ? -3 : 0 }} transition={{ duration: 0.5 }}>
        <rect x="210" y="32" width="88" height="88" rx="6" fill="white" stroke={STORY.blue.DEFAULT} strokeOpacity={live ? 0.18 : 0.1} />
        <motion.path
          d={chartPoints}
          stroke={STORY.blue.DEFAULT}
          strokeWidth="1.5"
          strokeOpacity={live ? 0.6 : 0.3}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: live ? 1 : 0.5 }}
          transition={{ duration: live ? 1.1 : 0.6, ease: EASE_OUT }}
        />
        <motion.circle
          cx="132"
          cy="102"
          r="3"
          fill={STORY.blue.DEFAULT}
          fillOpacity={live ? 0.75 : 0.35}
          animate={{ scale: active ? [1, 1.25, 1] : 1 }}
          transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
        />
      </motion.g>

      <motion.rect
        x="48"
        y="108"
        width="56"
        height="32"
        rx="3"
        fill={STORY.blue.soft}
        stroke={STORY.blue.DEFAULT}
        strokeOpacity="0.2"
        animate={{ rotate: active ? -1 : -3 }}
        style={{ transformOrigin: '76px 124px' }}
      />
    </svg>
  )
}

/** 02 — Strategy flow with animated progress */
export function IllustrationStrategy({ active, inView }: IllustrationProps) {
  const live = active || inView
  const steps = ['מודעה', 'דף נחיתה', 'הצעת ערך', 'יצירת קשר']
  const pillX = 88
  const pillW = 144
  const pillH = 26
  const textPad = 14
  const activeStep = active ? 3 : live ? 2 : 0

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <clipPath id="strategy-clip">
          <rect x="0" y="0" width="320" height="180" />
        </clipPath>
      </defs>
      <g clipPath="url(#strategy-clip)">
        {steps.map((label, i) => {
          const y = 28 + i * 36
          const isLast = i === steps.length - 1
          const isActive = i <= activeStep
          const textY = y + pillH / 2
          const textXRest = pillX + pillW - textPad
          const textXActive = pillX - 4 + pillW - textPad

          return (
            <g key={label}>
              {i < steps.length - 1 && (
                <>
                  <line
                    x1="160"
                    y1={y + 22}
                    x2="160"
                    y2={y + 36}
                    stroke="#111"
                    strokeWidth="1"
                    strokeOpacity="0.06"
                  />
                  <motion.line
                    x1="160"
                    y1={y + 22}
                    x2="160"
                    y2={y + 36}
                    stroke={STORY.blue.DEFAULT}
                    strokeWidth="1.25"
                    strokeOpacity={isActive ? 0.45 : 0.1}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isActive ? 1 : 0 }}
                    transition={{ delay: 0.2 + i * 0.2, duration: 0.45, ease: EASE_PREMIUM }}
                  />
                </>
              )}
              <motion.rect
                x={pillX}
                y={y}
                width={pillW}
                height={pillH}
                rx="13"
                fill={isLast && isActive ? '#111' : isActive ? STORY.blue.soft : 'white'}
                stroke={isActive ? STORY.blue.DEFAULT : '#111'}
                strokeWidth="1"
                strokeOpacity={isLast && isActive ? 1 : isActive ? 0.25 : 0.1}
                animate={{ x: isActive ? pillX - 4 : pillX }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              />
              <motion.text
                x={textXRest}
                y={textY}
                textAnchor="start"
                direction="rtl"
                dominantBaseline="central"
                fill={isLast && isActive ? 'white' : '#111'}
                fillOpacity={isActive ? (isLast ? 1 : 0.65) : 0.4}
                fontSize="7.5"
                fontFamily="Heebo, sans-serif"
                animate={{ x: isActive ? textXActive : textXRest }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {label}
              </motion.text>
              {isActive && i < steps.length - 1 && (
                <motion.circle
                  cx="160"
                  cy={y + 29}
                  r="2.5"
                  fill={STORY.blue.DEFAULT}
                  fillOpacity="0.7"
                  initial={{ cy: y + 22, opacity: 0 }}
                  animate={{ cy: [y + 22, y + 36], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                />
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/** 03 — UX with cleaner hierarchy */
export function IllustrationUX({ active, inView }: IllustrationProps) {
  const live = active || inView
  const frameX = 72
  const frameW = 176
  const textInset = 12
  const textRight = frameX + frameW - textInset

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <clipPath id="ux-frame-clip">
          <rect x={frameX} y="24" width={frameW} height="132" rx="8" />
        </clipPath>
      </defs>

      <motion.g
        animate={{ opacity: live ? 0.12 : 0.85, scale: live ? 0.96 : 1 }}
        style={{ transformOrigin: '160px 90px' }}
        transition={{ duration: 0.55 }}
      >
        <rect x="72" y="24" width="176" height="132" rx="8" stroke={STORY.purple.DEFAULT} strokeWidth="1" strokeDasharray="5 4" strokeOpacity={live ? 0.2 : 0.15} fill="#fafafa" />
        <rect x="88" y="40" width="80" height="8" rx="1" fill="#111" fillOpacity="0.08" />
        <rect x="88" y="56" width="120" height="5" rx="1" fill="#111" fillOpacity="0.06" />
        <rect x="88" y="68" width="96" height="5" rx="1" fill="#111" fillOpacity="0.05" />
        <rect x="88" y="88" width="56" height="20" rx="10" stroke="#111" strokeOpacity="0.15" fill="none" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0.2 }}
        animate={{ opacity: live ? 1 : 0.35, scale: live ? 1 : 0.98 }}
        style={{ transformOrigin: '160px 90px' }}
        transition={{ duration: 0.55 }}
        clipPath="url(#ux-frame-clip)"
      >
        <rect x="72" y="24" width="176" height="132" rx="8" fill="white" stroke={STORY.purple.DEFAULT} strokeOpacity={active ? 0.2 : 0.1} />
        <rect x="88" y="36" width="144" height="14" rx="2" fill={STORY.purple.soft} fillOpacity="0.5" />
        <text x="96" y="46" fill={STORY.purple.DEFAULT} fillOpacity="0.5" fontSize="5" fontWeight="600" fontFamily="Heebo, sans-serif">
          BRAND
        </text>
        <text x={textRight} y="68" textAnchor="start" direction="rtl" fill="#111" fontSize="12" fontWeight="700" fontFamily="Heebo, sans-serif">
          חוויה ברורה
        </text>
        <text x={textRight} y="84" textAnchor="start" direction="rtl" fill="#111" fillOpacity="0.45" fontSize="6.5" fontFamily="Heebo, sans-serif">
          מקצועית · אמינה · ממירה
        </text>
        <motion.rect
          x="88"
          y="96"
          width="64"
          height="22"
          rx="11"
          fill="#111"
          animate={{ opacity: active ? [0.85, 1, 0.85] : 0.9 }}
          transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        />
        <text x="120" y="110" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="600" fontFamily="Heebo, sans-serif">
          CTA
        </text>
        <rect x="88" y="126" width="68" height="22" rx="6" fill="#f8f8f8" stroke="#111" strokeOpacity="0.05" />
        <rect x="162" y="126" width="68" height="22" rx="6" fill="#f8f8f8" stroke="#111" strokeOpacity="0.05" />
      </motion.g>

      <motion.rect
        x="248"
        y="80"
        width="3"
        height="24"
        rx="1.5"
        fill={STORY.purple.DEFAULT}
        fillOpacity={active ? 0.25 : 0.1}
        animate={{ scaleY: active ? [0.8, 1, 0.8] : 0.9 }}
        style={{ transformOrigin: '249px 92px' }}
        transition={{ duration: 2, repeat: active ? Infinity : 0 }}
      />
    </svg>
  )
}

/** 04 — Performance / Lighthouse */
export function IllustrationDev({ active, inView }: IllustrationProps) {
  const live = active || inView
  const score = useAnimatedScore(!!live, 98)
  const metrics = [
    { label: 'Performance', loading: !live },
    { label: 'SEO Ready', loading: false },
    { label: 'Fast Load Time', loading: false },
    { label: 'Mobile Optimized', loading: false },
  ]

  const panel = { x: 40, y: 28, w: 240, h: 124, pad: 16, rx: 10 }
  const innerRight = panel.x + panel.w - panel.pad
  const metricsLeft = 152
  const dotR = 3
  const rowH = 20
  const rowStep = 22
  const rowStart = panel.y + panel.pad + 18
  const listX = metricsLeft
  const listW = innerRight - metricsLeft
  const dotCx = metricsLeft + 10 + dotR
  const textX = dotCx + dotR + 35

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <clipPath id="dev-panel-clip">
          <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx={panel.rx} />
        </clipPath>
      </defs>

      <motion.rect
        x={panel.x}
        y={panel.y}
        width={panel.w}
        height={panel.h}
        rx={panel.rx}
        fill="white"
        stroke={STORY.green.DEFAULT}
        strokeOpacity={live ? 0.14 : 0.08}
        animate={{ y: active ? panel.y - 2 : panel.y }}
        transition={{ duration: 0.45 }}
      />

      <circle cx="100" cy="88" r="40" stroke="#111" strokeOpacity="0.08" fill="#fafafa" />
      <motion.circle
        cx="100"
        cy="88"
        r="40"
        stroke={STORY.green.DEFAULT}
        strokeWidth="2"
        strokeOpacity={live ? 0.6 : 0.3}
        fill="none"
        strokeDasharray="251"
        initial={{ strokeDashoffset: 80 }}
        animate={{ strokeDashoffset: live ? 6 : 45 }}
        transition={{ duration: 1, ease: EASE_OUT }}
        style={{ transformOrigin: '100px 88px', rotate: -90 }}
      />
      {active && (
        <motion.circle
          cx="100"
          cy="48"
          r="2"
          fill={STORY.green.DEFAULT}
          fillOpacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <text x="100" y="84" textAnchor="middle" fill={STORY.green.DEFAULT} fontSize="22" fontWeight="700" fontFamily="Heebo, sans-serif">
        {score}
      </text>
      <text x="100" y="102" textAnchor="middle" fill="#111" fillOpacity="0.35" fontSize="6" fontFamily="Heebo, sans-serif">
        Lighthouse
      </text>

      <g clipPath="url(#dev-panel-clip)">
        {metrics.map((m, i) => {
          const rowY = rowStart + i * rowStep
          const loaded = live && !m.loading

          return (
            <g key={m.label}>
              <motion.rect
                x={listX}
                y={rowY}
                width={listW}
                height={rowH}
                rx="6"
                fill="#f7f7f7"
                stroke="#111"
                strokeOpacity="0.06"
                animate={{ x: active ? listX - 2 : listX, fill: loaded ? '#f0faf4' : '#f7f7f7' }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              />
              {!loaded && (
                <motion.rect
                  x={listX + 8}
                  y={rowY + 7}
                  width={listW - 16}
                  height="6"
                  rx="3"
                  fill="#111"
                  fillOpacity="0.05"
                  animate={{ opacity: [0.04, 0.1, 0.04] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
              )}
              {loaded && (
                <>
                  <circle
                    cx={dotCx}
                    cy={rowY + rowH / 2}
                    r={dotR}
                    fill={i === 3 ? STORY.purple.DEFAULT : STORY.green.DEFAULT}
                    fillOpacity={active ? 0.7 : 0.45}
                  />
                  <text
                    x={textX}
                    y={rowY + rowH / 2}
                    direction="ltr"
                    textAnchor="start"
                    dominantBaseline="central"
                    fill="#111"
                    fillOpacity={i === 0 ? 0.4 : 0.5}
                    fontSize={i === 0 ? 6.5 : 6}
                    fontWeight={i === 0 ? 600 : 400}
                    fontFamily="Heebo, sans-serif"
                  >
                    {m.label}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export const ILLUSTRATIONS = [
  IllustrationUnderstand,
  IllustrationStrategy,
  IllustrationUX,
  IllustrationDev,
] as const
