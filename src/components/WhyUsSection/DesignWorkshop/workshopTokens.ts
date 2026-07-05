export const WORKSHOP = {
  purple: '#7C3AED',
  purpleSoft: 'rgba(124, 58, 237, 0.12)',
  purpleGlow: 'rgba(124, 58, 237, 0.18)',
  glass: 'rgba(255, 255, 255, 0.82)',
  glassBorder: 'rgba(17, 17, 17, 0.08)',
} as const

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}

export function stepBlend(phase: number, index: number, spread = 0.52) {
  const d = Math.abs(phase - index)
  const t = clamp(1 - d / spread, 0, 1)
  return 1 - (1 - t) ** 3
}
