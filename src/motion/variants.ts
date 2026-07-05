import { EASE_PREMIUM } from './easing'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_PREMIUM },
  },
}

export const blurReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE_PREMIUM },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
}

export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
}

export const staggerItemBlur = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
}

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.35, ease: EASE_PREMIUM } },
}

export const cardShadow = {
  rest: '0 12px 40px -20px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.04)',
  hover: '0 32px 80px -28px rgba(0,0,0,0.16), 0 0 48px -24px rgba(37,99,235,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
}
