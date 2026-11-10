import { forwardRef, type ReactNode } from 'react'
import { GlowOrb } from './GlowOrb'

export type SectionTone = 'bright' | 'soft'
export type SectionGlow = 'blue' | 'violet' | 'none'

interface SectionShellProps {
  id?: string
  tone?: SectionTone
  glow?: SectionGlow
  children: ReactNode
  className?: string
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(function SectionShell(
  { id, glow = 'violet', children, className = '' },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden bg-white px-6 py-16 md:px-10 md:py-32 lg:px-16 lg:py-40 ${className}`}
    >
      {glow === 'violet' && (
        <GlowOrb
          tone="violet"
          size="xl"
          opacity={0.04}
          className="-right-[10%] top-[10%] hidden md:block"
        />
      )}
      {glow === 'blue' && (
        <GlowOrb
          tone="blue"
          size="lg"
          opacity={0.035}
          className="-left-[8%] bottom-[12%] hidden md:block"
        />
      )}

      <div className="relative mx-auto max-w-[1100px]">{children}</div>
    </section>
  )
})
