export type MaterialType = 'paper' | 'blueprint' | 'design' | 'code' | 'product'

export interface StageMaterial {
  background: string
  border: string
  shadow: string
  floorShadow: string
  overlay?: string
}

export const stageMaterials: Record<MaterialType, StageMaterial> = {
  paper: {
    background: 'linear-gradient(160deg, #faf7f0 0%, #f3efe6 100%)',
    border: 'rgba(140, 115, 85, 0.32)',
    shadow:
      '0 4px 12px rgba(0,0,0,0.08), 0 16px 36px -8px rgba(92,74,56,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
    floorShadow: 'radial-gradient(ellipse, rgba(92,74,56,0.12) 0%, transparent 70%)',
    overlay:
      'repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(0,0,0,0.025) 13px, rgba(0,0,0,0.025) 14px)',
  },
  blueprint: {
    background: 'linear-gradient(160deg, #1a4472 0%, #153660 100%)',
    border: 'rgba(120, 180, 255, 0.25)',
    shadow:
      '0 4px 16px rgba(0,0,0,0.15), 0 16px 40px -8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
    floorShadow: 'radial-gradient(ellipse, rgba(0,0,0,0.14) 0%, transparent 70%)',
    overlay:
      'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
  },
  design: {
    background: '#ffffff',
    border: 'rgba(0, 0, 0, 0.07)',
    shadow:
      '0 4px 16px rgba(0,0,0,0.06), 0 20px 48px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)',
    floorShadow: 'radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%)',
  },
  code: {
    background: '#1e1e1e',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow:
      '0 4px 20px rgba(0,0,0,0.2), 0 24px 56px -12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
    floorShadow: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
  },
  product: {
    background: '#ffffff',
    border: 'rgba(0, 0, 0, 0.09)',
    shadow:
      '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px -6px rgba(0,0,0,0.14), 0 40px 80px -16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,1)',
    floorShadow: 'radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 68%)',
  },
}
