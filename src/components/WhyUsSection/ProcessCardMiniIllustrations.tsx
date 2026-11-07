/** Step-indexed mini UI previews for process cards (CSS only). */

export function ProcessCardMiniIllustration({ stepIndex }: { stepIndex: number }) {
  switch (stepIndex) {
    case 0:
      return <InsightsChart />
    case 1:
      return <WireframeDiagram />
    case 2:
      return <DesignSystemPreview />
    default:
      return <PerformanceChart chartId="why-us-chart-launch" />
  }
}

function InsightsChart() {
  const bars = [42, 68, 52, 78]
  return (
    <div className="flex h-full flex-col justify-end px-4 pb-3 pt-2" aria-hidden>
      <div className="mb-1.5 text-[7px] font-medium text-text/35 md:text-[8px]">תובנות</div>
      <div className="flex items-end justify-center gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-3 rounded-sm bg-gradient-to-t from-story-purple/70 to-story-purple/25 md:w-3.5"
              style={{ height: `${h * 0.55}px` }}
            />
            <div className="h-0.5 w-3 rounded-full bg-text/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  )
}

function WireframeDiagram() {
  return (
    <div className="flex h-full items-center justify-center p-3" aria-hidden>
      <div className="w-full max-w-[140px] rounded-lg border border-dashed border-text/15 bg-white/90 p-2.5">
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-sm border border-text/20" />
          <div className="h-1 flex-1 rounded bg-text/10" />
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <div className="h-1.5 w-full rounded bg-text/12" />
            <div className="h-1 w-4/5 rounded bg-text/[0.08]" />
            <div className="mt-1 h-3 w-10 rounded border border-text/15" />
          </div>
          <div className="w-[38%] rounded border border-dashed border-text/12 bg-secondary/60" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded border border-text/10 bg-secondary/40" />
          ))}
        </div>
      </div>
    </div>
  )
}

function DesignSystemPreview() {
  const swatches = ['#111111', '#7C3AED', '#F7F7F7']
  return (
    <div className="flex h-full items-center justify-between gap-3 px-4 py-2" aria-hidden>
      <div>
        <div className="text-[7px] font-medium text-text/35 md:text-[8px]">צבעים</div>
        <div className="mt-1.5 flex gap-1.5">
          {swatches.map((hex) => (
            <div
              key={hex}
              className="h-4 w-4 rounded-full border border-black/[0.06] shadow-sm md:h-[18px] md:w-[18px]"
              style={{ background: hex }}
            />
          ))}
        </div>
      </div>
      <div className="text-end">
        <div className="text-[7px] font-medium text-text/35 md:text-[8px]">טיפוגרפיה</div>
        <p className="text-xl font-extrabold leading-none text-text md:text-2xl">Aa</p>
        <p className="mt-0.5 text-[6px] text-text/30 md:text-[7px]">Heebo</p>
      </div>
    </div>
  )
}

function PerformanceChart({ chartId }: { chartId: string }) {
  return (
    <div className="relative flex h-full flex-col justify-end px-3 pb-2 pt-1" aria-hidden>
      <div className="mb-1 flex items-center justify-between px-1">
        <span className="text-[7px] font-medium text-text/35 md:text-[8px]">ביצועים</span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-story-purple/50" />
          ))}
        </span>
      </div>
      <svg viewBox="0 0 120 36" className="h-9 w-full max-w-[160px] self-center md:h-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(124,58,237,0.18)" />
            <stop offset="100%" stopColor="rgba(124,58,237,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 28 L24 22 L48 24 L72 14 L96 10 L120 4 L120 36 L0 36 Z"
          fill={`url(#${chartId})`}
        />
        <path
          d="M0 28 L24 22 L48 24 L72 14 L96 10 L120 4"
          fill="none"
          stroke="rgba(124,58,237,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
