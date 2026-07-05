/** Business website — trust, services, portfolio, multi-section presence */

export function BusinessPagePreview() {
  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col overflow-hidden bg-[#FAFAFA] text-[#111]"
      dir="ltr"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.05] bg-white px-[7%] py-[3.2%]">
        <span className="text-[clamp(7px,2vw,9px)] font-bold tracking-tight">STUDIO M</span>
        <div className="hidden items-center gap-[5%] sm:flex">
          {['Services', 'Work', 'About'].map((item) => (
            <span key={item} className="text-[clamp(5px,1.4vw,6.5px)] text-text/35">
              {item}
            </span>
          ))}
        </div>
        <span className="rounded-full border border-black/[0.1] px-[4%] py-[1%] text-[clamp(5px,1.3vw,6px)] font-medium text-text/55">
          Contact
        </span>
      </div>

      <div className="flex flex-1 flex-col px-[7%] py-[4.5%]">
        <div className="flex items-start justify-between gap-[5%]">
          <div className="max-w-[55%]">
            <span className="text-[clamp(5px,1.3vw,6px)] font-medium uppercase tracking-[0.14em] text-story-blue/70">
              Business website
            </span>
            <div className="mt-[4%] text-[clamp(10px,3.2vw,15px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
              Your business,
              <br />
              presented right
            </div>
            <p className="mt-[3%] text-[clamp(5.5px,1.5vw,7px)] leading-[1.6] text-text/38">
              Services, portfolio and proof — everything clients need to trust you.
            </p>
          </div>
          <div className="w-[38%] overflow-hidden rounded-[5%] border border-black/[0.06] bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.1)]">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#EEF2F7] via-[#F8FAFC] to-[#E2E8F0]" />
          </div>
        </div>

        <div className="mt-[5%] grid grid-cols-3 gap-[3%]">
          {['Services', 'Portfolio', 'Reviews'].map((label) => (
            <div
              key={label}
              className="rounded-[5%] border border-black/[0.05] bg-white px-[5%] py-[4.5%] shadow-[0_2px_12px_-6px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-[8%] h-[clamp(4px,1.2vw,6px)] w-[clamp(4px,1.2vw,6px)] rounded-sm bg-story-blue/25" />
              <div className="text-[clamp(5.5px,1.5vw,7px)] font-semibold text-text/65">{label}</div>
              <div className="mt-[6%] h-[1.5px] w-full rounded-full bg-black/[0.05]" />
              <div className="mt-[5%] h-[1.5px] w-[70%] rounded-full bg-black/[0.04]" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-black/[0.05] bg-white px-[7%] py-[3%]">
        <div className="flex gap-[4%]">
          {['Logo', 'Logo', 'Logo'].map((_, i) => (
            <div key={i} className="h-[clamp(5px,1.5vw,7px)] w-[clamp(14px,4vw,20px)] rounded bg-black/[0.06]" />
          ))}
        </div>
        <span className="text-[clamp(5px,1.3vw,6px)] text-text/30">Trusted by clients</span>
      </div>
    </div>
  )
}
