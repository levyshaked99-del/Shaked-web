import type { ReactNode } from 'react'

interface ProcessBrowserFrameProps {
  children: ReactNode
  stepIndex: number
}

const URLS = ['research.local', 'wireframe.local', 'design-system.local', 'your-business.co.il']

export function ProcessBrowserFrame({ children, stepIndex }: ProcessBrowserFrameProps) {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[28px] opacity-70 md:-inset-10 md:rounded-[36px]"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 42%, rgba(245,243,255,0.85) 0%, transparent 72%)',
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white shadow-depth-lg md:rounded-[22px]">
        <div className="flex items-center gap-2 border-b border-black/[0.05] bg-secondary/80 px-3 py-2.5 md:px-4 md:py-3">
          <div className="flex gap-1.5" aria-hidden>
            <div className="h-2 w-2 rounded-full bg-[#E5E5E5] md:h-2.5 md:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-[#E5E5E5] md:h-2.5 md:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-[#E5E5E5] md:h-2.5 md:w-2.5" />
          </div>
          <div className="mx-auto flex h-6 flex-1 max-w-[200px] items-center justify-center rounded-md bg-white px-3 ring-1 ring-black/[0.04] md:h-7 md:max-w-[240px]">
            <span className="truncate text-[9px] text-text/35 md:text-[10px]">{URLS[stepIndex]}</span>
          </div>
        </div>

        <div className="relative aspect-[16/11] w-full overflow-hidden bg-white">{children}</div>
      </div>
    </div>
  )
}
