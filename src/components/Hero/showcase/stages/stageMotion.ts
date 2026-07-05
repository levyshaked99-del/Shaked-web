export const stageEase = [0.25, 0.1, 0.25, 1] as const

export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
}

export function stagger(i: number, base = 0.12) {
  return { delay: i * base, duration: 0.45, ease: stageEase }
}
