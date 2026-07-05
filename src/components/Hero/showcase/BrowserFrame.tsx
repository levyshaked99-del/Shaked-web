import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  footer?: ReactNode
}

export function BrowserFrame({ children, footer }: BrowserFrameProps) {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[24px] opacity-60 md:-inset-8 md:rounded-[32px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(250,250,252,0.9) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-primary shadow-depth-lg md:rounded-[20px]"
        dir="ltr"
      >
        <div className="flex items-center gap-2.5 border-b border-black/[0.05] bg-secondary px-3 py-2.5 md:px-4 md:py-3">
          <div className="flex gap-1.5" aria-hidden>
            <div className="h-2 w-2 rounded-full bg-[#E8E8E8] md:h-2.5 md:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-[#E8E8E8] md:h-2.5 md:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-[#E8E8E8] md:h-2.5 md:w-2.5" />
          </div>
          <div className="mx-auto flex h-6 flex-1 max-w-[180px] items-center justify-center rounded-md bg-primary px-3 ring-1 ring-black/[0.04] md:h-7 md:max-w-[220px]">
            <span className="truncate text-[9px] text-text/30 md:text-[10px]">your-business.co.il</span>
          </div>
        </div>

        <div className="relative aspect-[10/7] w-full overflow-hidden bg-white">{children}</div>

        {footer && (
          <div className="border-t border-black/[0.05] bg-secondary px-4 py-3 md:px-5 md:py-3.5">{footer}</div>
        )}
      </div>
    </div>
  )
}
