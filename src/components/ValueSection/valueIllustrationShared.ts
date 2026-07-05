/** Shared tokens for Value section illustrations */
export const VB = { w: 320, h: 180 } as const

/** Min ~12px when rendered at card width (~300px) */
export const MIN_FONT = 13

export const ILLU = {
  stroke: 1.25,
  radius: 10,
  radiusSm: 8,
  ink: '#111111',
  inkMuted: 0.45,
  inkFaint: 0.1,
  font: 'Heebo, system-ui, sans-serif',
  ease: [0.25, 0.1, 0.25, 1] as const,
} as const

export const SHADOW_FILTER = 'value-ill-shadow'

/** Unified horizontal flow layout — 4 nodes, vertically centered */
export const FLOW = {
  node: 56,
  gap: 18,
  centerY: 90,
  count: 4,
  totalWidth: 4 * 56 + 3 * 18,
  startX: (VB.w - (4 * 56 + 3 * 18)) / 2,
  nodeX: (i: number) => (VB.w - (4 * 56 + 3 * 18)) / 2 + i * (56 + 18),
  nodeY: 90 - 56 / 2,
  dotCy: 90,
  dotCx: (i: number) => (VB.w - (4 * 56 + 3 * 18)) / 2 + i * (56 + 18) + 28,
} as const

/** Unified panel for card-style illustrations */
export const PANEL = {
  w: 264,
  h: 120,
  x: (VB.w - 264) / 2,
  y: (VB.h - 120) / 2,
} as const
