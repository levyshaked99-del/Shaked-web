import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'
import { STORY } from '../../design/storyColors'
import { IllustrationTrust } from './IllustrationTrust'
import { FLOW, ILLU, MIN_FONT, PANEL, SHADOW_FILTER, VB } from './valueIllustrationShared'

export { IllustrationTrust }

interface Props {
  active?: boolean
}

function IllustrationFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="h-full w-full overflow-hidden"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id={SHADOW_FILTER} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.08" />
        </filter>
      </defs>
      {children}
    </svg>
  )
}

function NodeBox({
  x,
  y,
  w,
  h,
  stroke,
  fill = 'white',
  strokeOpacity = 0.15,
}: {
  x: number
  y: number
  w: number
  h: number
  stroke: string
  fill?: string
  strokeOpacity?: number
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={ILLU.radiusSm}
      fill={fill}
      stroke={stroke}
      strokeWidth={ILLU.stroke}
      strokeOpacity={strokeOpacity}
      filter={`url(#${SHADOW_FILTER})`}
    />
  )
}

function FlowConnectors({ color, count = 4 }: { color: string; count?: number }) {
  return (
    <>
      {Array.from({ length: count - 1 }, (_, i) => (
        <line
          key={i}
          x1={FLOW.nodeX(i) + FLOW.node + 4}
          y1={FLOW.dotCy}
          x2={FLOW.nodeX(i + 1) - 4}
          y2={FLOW.dotCy}
          stroke={color}
          strokeWidth={ILLU.stroke}
          strokeOpacity={0.22}
          strokeLinecap="round"
        />
      ))}
    </>
  )
}

function FlowDot({ active, color, count = 4 }: { active?: boolean; color: string; count?: number }) {
  const cx = Array.from({ length: count }, (_, i) => FLOW.dotCx(i))
  return (
    <motion.circle
      r={5}
      fill={color}
      animate={
        active
          ? { cx, cy: Array(count).fill(FLOW.dotCy), opacity: [0.55, 1, 1, 1] }
          : { cx: cx[0], cy: FLOW.dotCy, opacity: 0.5 }
      }
      transition={
        active
          ? { duration: 3, repeat: Infinity, ease: 'linear', times: [0, 0.33, 0.66, 1] }
          : { duration: 0.3 }
      }
    />
  )
}

/* ── Icons (centered in node at index i) ── */

function nodeCenter(i: number) {
  return { cx: FLOW.dotCx(i), cy: FLOW.dotCy }
}

function IconUser({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <circle cx={cx} cy={cy - 4} r={8} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.4} />
      <path d={`M${cx - 10} ${cy + 14} Q${cx} ${cy + 2} ${cx + 10} ${cy + 14}`} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.35} />
    </>
  )
}

function IconChat({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <rect x={cx - 14} y={cy - 12} width={28} height={20} rx={8} fill={color} fillOpacity={0.1} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.4} />
      <path d={`M${cx - 6} ${cy + 8} L${cx} ${cy + 14} L${cx + 6} ${cy + 8}`} fill={color} fillOpacity={0.1} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.35} />
    </>
  )
}

function IconCrm({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <rect x={cx - 14} y={cy - 12} width={28} height={24} rx={4} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.35} />
      {[0, 1, 2].map((row) => (
        <line key={row} x1={cx - 8} y1={cy - 4 + row * 7} x2={cx + 8} y2={cy - 4 + row * 7} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.45} />
      ))}
    </>
  )
}

function IconMail({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <rect x={cx - 14} y={cy - 10} width={28} height={20} rx={3} fill="white" stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.4} />
      <path d={`M${cx - 14} ${cy - 6} L${cx} ${cy + 4} L${cx + 14} ${cy - 6}`} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.4} fill="none" />
    </>
  )
}

function IconMegaphone({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <path
      d={`M${cx - 12} ${cy - 4} L${cx + 2} ${cy - 10} L${cx + 2} ${cy + 10} L${cx - 12} ${cy + 4} Z M${cx + 2} ${cy - 6} L${cx + 14} ${cy - 12} V${cy + 12} L${cx + 2} ${cy + 6} Z`}
      fill={color}
      fillOpacity={0.12}
      stroke={color}
      strokeWidth={ILLU.stroke}
      strokeOpacity={0.45}
      strokeLinejoin="round"
    />
  )
}

function IconBrowser({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <rect x={cx - 14} y={cy - 12} width={28} height={22} rx={3} fill="white" stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.4} />
      <line x1={cx - 14} y1={cy - 4} x2={cx + 14} y2={cy - 4} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.25} />
      <circle cx={cx - 8} cy={cy - 8} r={2} fill={color} fillOpacity={0.35} />
    </>
  )
}

function IconForm({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <rect x={cx - 12} y={cy - 10} width={24} height={6} rx={2} fill={ILLU.ink} fillOpacity={0.08} />
      <rect x={cx - 12} y={cy} width={18} height={6} rx={2} fill={ILLU.ink} fillOpacity={0.05} />
      <rect x={cx - 12} y={cy + 10} width={24} height={8} rx={4} fill={color} fillOpacity={0.2} />
    </>
  )
}

function IconCheck({ i, color }: { i: number; color: string }) {
  const { cx, cy } = nodeCenter(i)
  return (
    <>
      <circle cx={cx} cy={cy} r={14} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={ILLU.stroke} strokeOpacity={0.45} />
      <path d={`M${cx - 6} ${cy} L${cx - 1} ${cy + 5} L${cx + 8} ${cy - 6}`} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

/** Leads — Ad → Page → Form → Lead (blue dot) */
export function IllustrationLeads({ active }: Props) {
  const color = STORY.blue.DEFAULT

  return (
    <IllustrationFrame>
      <FlowConnectors color={color} />
      {Array.from({ length: 4 }, (_, i) => (
        <motion.g key={i} animate={{ y: active ? -1 : 0 }} transition={{ delay: i * 0.04, duration: 0.4 }}>
          <NodeBox
            x={FLOW.nodeX(i)}
            y={FLOW.nodeY}
            w={FLOW.node}
            h={FLOW.node}
            stroke={i === 3 ? STORY.green.DEFAULT : color}
            fill={i === 3 ? STORY.green.soft : 'white'}
            strokeOpacity={i === 3 ? 0.35 : 0.2}
          />
          {i === 0 && <IconMegaphone i={i} color={color} />}
          {i === 1 && <IconBrowser i={i} color={color} />}
          {i === 2 && <IconForm i={i} color={color} />}
          {i === 3 && <IconCheck i={i} color={STORY.green.DEFAULT} />}
        </motion.g>
      ))}
      <FlowDot active={active} color={color} />
    </IllustrationFrame>
  )
}

/** Automation — Lead → WhatsApp → CRM → Email (purple dot) */
export function IllustrationAlwaysOn({ active }: Props) {
  const color = STORY.purple.DEFAULT

  return (
    <IllustrationFrame>
      <FlowConnectors color={color} />
      {Array.from({ length: 4 }, (_, i) => (
        <motion.g
          key={i}
          animate={{ y: active ? -1 : 0, scale: active ? [1, 1.02, 1] : 1 }}
          transition={{ delay: i * 0.04, duration: 0.4, scale: { duration: 3, repeat: Infinity, delay: i * 0.5 } }}
          style={{ transformOrigin: `${FLOW.dotCx(i)}px ${FLOW.dotCy}px` }}
        >
          <NodeBox x={FLOW.nodeX(i)} y={FLOW.nodeY} w={FLOW.node} h={FLOW.node} stroke={color} strokeOpacity={0.22} />
          {i === 0 && <IconUser i={i} color={color} />}
          {i === 1 && <IconChat i={i} color={color} />}
          {i === 2 && <IconCrm i={i} color={color} />}
          {i === 3 && <IconMail i={i} color={color} />}
        </motion.g>
      ))}
      <FlowDot active={active} color={color} />
    </IllustrationFrame>
  )
}

/** Growth — chart with 2025–2027 (green) */
export function IllustrationGrowth({ active }: Props) {
  const { x: px, y: py, w: pw, h: ph } = PANEL
  const chartX = px + 20
  const chartW = pw - 40
  const chartTop = py + 24
  const baseY = py + ph - 22

  const years = [
    { x: chartX + 24, label: '2025', y: baseY - 28 },
    { x: chartX + chartW / 2, label: '2026', y: baseY - 52 },
    { x: chartX + chartW - 24, label: '2027', y: baseY - 76 },
  ]

  const linePath = `M ${years[0].x} ${years[0].y} C ${years[0].x + 32} ${years[0].y - 8}, ${years[1].x - 32} ${years[1].y + 4}, ${years[1].x} ${years[1].y} C ${years[1].x + 32} ${years[1].y - 12}, ${years[2].x - 32} ${years[2].y + 4}, ${years[2].x} ${years[2].y}`
  const areaPath = `${linePath} L ${years[2].x} ${baseY} L ${years[0].x} ${baseY} Z`

  return (
    <IllustrationFrame>
      <motion.rect
        x={px}
        y={py}
        width={pw}
        height={ph}
        rx={ILLU.radius}
        fill="white"
        stroke={ILLU.ink}
        strokeWidth={ILLU.stroke}
        strokeOpacity={ILLU.inkFaint}
        filter={`url(#${SHADOW_FILTER})`}
        animate={{ y: active ? py - 1 : py }}
        transition={{ duration: 0.45, ease: ILLU.ease }}
      />

      <line x1={chartX} y1={baseY} x2={chartX + chartW} y2={baseY} stroke={ILLU.ink} strokeWidth={ILLU.stroke} strokeOpacity={0.1} />
      <line x1={chartX} y1={chartTop} x2={chartX} y2={baseY} stroke={ILLU.ink} strokeWidth={ILLU.stroke} strokeOpacity={0.08} />

      <motion.path d={areaPath} fill={STORY.green.DEFAULT} animate={{ opacity: active ? 0.1 : 0.05 }} transition={{ duration: 0.6 }} />
      <motion.path
        d={linePath}
        stroke={STORY.green.DEFAULT}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0.7, opacity: active ? 0.9 : 0.55 }}
        transition={{ duration: 1, ease: ILLU.ease }}
      />

      {years.map((pt, i) => (
        <g key={pt.label}>
          <motion.circle
            cx={pt.x}
            cy={pt.y}
            r={5}
            fill="white"
            stroke={STORY.green.DEFAULT}
            strokeWidth={1.5}
            animate={{ cy: active ? pt.y - 2 : pt.y }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
          <text x={pt.x} y={baseY + 16} textAnchor="middle" fill={ILLU.ink} fillOpacity={0.4} fontSize={MIN_FONT} fontFamily={ILLU.font}>
            {pt.label}
          </text>
        </g>
      ))}

      <text x={chartX + chartW} y={chartTop + 4} textAnchor="end" fill={STORY.green.DEFAULT} fontSize={MIN_FONT + 2} fontWeight="700" fontFamily={ILLU.font}>
        +127%
      </text>
    </IllustrationFrame>
  )
}

export const VALUE_ILLUSTRATIONS: Record<string, ComponentType<Props>> = {
  trust: IllustrationTrust,
  leads: IllustrationLeads,
  'always-on': IllustrationAlwaysOn,
  growth: IllustrationGrowth,
}
