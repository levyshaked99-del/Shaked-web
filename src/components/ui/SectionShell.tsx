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
  { id, tone = 'bright', glow = 'violet', children, className = '' },
  ref,
) {
  const bg = tone === 'soft' ? 'bg-secondary' : 'bg-white'
  const fadeFrom = tone === 'soft' ? 'from-white' : 'from-secondary/90'

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${bg} px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40 ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${fadeFrom} to-transparent`}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/[0.015] to-transparent"
        aria-hidden
      />

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

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% -5%, rgba(255,255,255,0.85) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px]">{children}</div>
    </section>
  )
})
