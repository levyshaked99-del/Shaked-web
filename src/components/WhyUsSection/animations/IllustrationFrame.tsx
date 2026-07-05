import type { ReactNode } from 'react'

interface IllustrationFrameProps {
  children: ReactNode
}

export function IllustrationFrame({ children }: IllustrationFrameProps) {
  return (
    <div className="relative h-full w-full">
      <div
        className="pointer-events-none absolute -inset-4 rounded-[32px] opacity-70 md:-inset-6"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0.04) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-black/[0.05] bg-gradient-to-b from-white via-white to-secondary/40 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] md:rounded-[28px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.9) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  )
}
