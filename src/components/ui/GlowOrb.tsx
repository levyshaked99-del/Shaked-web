type GlowTone = 'blue' | 'violet' | 'dual'

interface GlowOrbProps {
  tone?: GlowTone
  size?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
  className?: string
}

const sizeMap = {
  sm: 'h-40 w-40',
  md: 'h-64 w-64',
  lg: 'h-80 w-80',
  xl: 'h-[28rem] w-[28rem]',
}

const toneMap: Record<GlowTone, string> = {
  blue: 'bg-brand',
  violet: 'bg-brand-violet',
  dual: 'bg-gradient-to-br from-brand/80 to-brand-violet/80',
}

export function GlowOrb({ tone = 'blue', size = 'md', opacity = 0.07, className = '' }: GlowOrbProps) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${sizeMap[size]} ${toneMap[tone]} ${className}`}
      style={{ opacity }}
      aria-hidden
    />
  )
}
