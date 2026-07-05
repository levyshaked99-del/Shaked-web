/** Premium website — editorial, bespoke, luxury-grade craft */

export function PremiumPagePreview() {
  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col overflow-hidden bg-[#0A0A0A] text-white"
      dir="ltr"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_0%,rgba(255,255,255,0.06),transparent_55%)]" aria-hidden />

      <div className="relative flex shrink-0 items-center justify-between px-[8%] py-[3.5%]">
        <span className="text-[clamp(6px,1.8vw,8px)] font-medium tracking-[0.22em] text-white/50">MAISON</span>
        <span className="text-[clamp(5px,1.3vw,6px)] tracking-[0.18em] text-white/30">INDEX</span>
      </div>

      <div className="relative flex flex-1 flex-col px-[8%] pb-[6%]">
        <div className="relative flex-1 overflow-hidden rounded-[2%] border border-white/[0.08]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1814] via-[#0f0e0c] to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(196,165,116,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_40%,rgba(255,255,255,0.03)_50%,transparent_60%)]" />
          <div className="absolute bottom-0 left-[10%] h-[75%] w-[28%] bg-gradient-to-t from-transparent to-white/[0.04]" />
          <div className="absolute bottom-0 right-[8%] h-[55%] w-[22%] bg-gradient-to-t from-transparent to-white/[0.03]" />
        </div>

        <div className="relative z-10 -mt-[18%]">
          <div className="mb-[3%] h-px w-[12%] bg-white/35" />
          <div className="text-[clamp(12px,3.8vw,18px)] font-light leading-[1.08] tracking-[-0.02em]">
            Bespoke
            <br />
            <span className="font-semibold text-white/90">digital craft</span>
          </div>
          <p className="mt-[3%] max-w-[68%] text-[clamp(5.5px,1.5vw,7px)] leading-[1.65] text-white/32">
            Custom UX, advanced interactions and design at the highest level.
          </p>
          <div className="mt-[5%] inline-flex items-center gap-[4%] border border-white/12 px-[5%] py-[1.8%] text-[clamp(5px,1.3vw,6px)] tracking-[0.12em] text-white/45">
            VIEW PROJECT
          </div>
        </div>
      </div>
    </div>
  )
}
