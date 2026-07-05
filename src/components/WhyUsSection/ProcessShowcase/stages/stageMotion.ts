import { EASE_PREMIUM } from '../../../../motion/easing'

export const STAGE_EASE = EASE_PREMIUM

export function stageStagger(index: number, base = 0.08) {
  return { delay: base + index * 0.07, duration: 0.55, ease: STAGE_EASE }
}
