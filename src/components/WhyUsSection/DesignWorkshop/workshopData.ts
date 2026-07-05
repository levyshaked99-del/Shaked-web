export const WORKSHOP_IMAGE_SRC = '/images/workshop-scene.png'

export const WORKSHOP_IMAGE_ALT = 'סטודיו עיצוב — תהליך עבודה אמיתי לפני עיצוב האתר'

export type HotspotRect = {
  left: string
  top: string
  width: string
  height: string
}

/** Hotspots tuned to the workshop hero image (percentage of container) */
export const WORKSHOP_HOTSPOTS = {
  strategy: { left: '1%', top: '7%', width: '21%', height: '30%' },
  strategyDesk: { left: '4%', top: '36%', width: '16%', height: '14%' },
  wireframes: { left: '19%', top: '5%', width: '17%', height: '26%' },
  wireframeDesk: { left: '20%', top: '38%', width: '12%', height: '10%' },
  designSystem: { left: '38%', top: '4%', width: '20%', height: '22%' },
  prototype: { left: '58%', top: '6%', width: '14%', height: '24%' },
  mainScreen: { left: '30%', top: '40%', width: '20%', height: '16%' },
  laptop: { left: '50%', top: '44%', width: '13%', height: '11%' },
  tablet: { left: '36%', top: '54%', width: '10%', height: '8%' },
} as const satisfies Record<string, HotspotRect>

export const WORKSHOP_STEP_LABELS = ['Strategy', 'Wireframes', 'Design System', 'Launch'] as const
