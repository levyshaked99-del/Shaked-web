export const VB = { w: 440, h: 360 } as const

export const ILLU = {
  ink: '#111111',
  inkMuted: 'rgba(17,17,17,0.35)',
  inkFaint: 'rgba(17,17,17,0.06)',
  accent: '#CA8A04',
  accentSoft: 'rgba(202,138,4,0.12)',
  panel: '#FFFFFF',
  stroke: 1,
  radius: 20,
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 0.85,
} as const

export const STAGE = { x: 32, y: 28, w: 376, h: 304 } as const

export function phase(t: number, start: number, end: number) {
  if (t <= start) return 0
  if (t >= end) return 1
  const p = (t - start) / (end - start)
  return 1 - (1 - p) ** 3
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
