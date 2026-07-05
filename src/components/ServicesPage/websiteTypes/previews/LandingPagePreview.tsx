/** Landing page — conversion-first: one offer, form, social proof */

export function LandingPagePreview() {
  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col overflow-hidden bg-white text-[#111]"
      dir="ltr"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.05] px-[8%] py-[3.5%]">
        <span className="text-[clamp(7px,2vw,9px)] font-bold tracking-tight text-text">LEADFLOW</span>
        <span className="rounded-full bg-story-purple px-[5%] py-[1.2%] text-[clamp(5px,1.4vw,6.5px)] font-semibold text-white">
          Free quote
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-[8%] py-[5%]">
          <span className="w-fit rounded-full border border-story-purple/15 bg-story-purple-soft/60 px-[5%] py-[1%] text-[clamp(5px,1.3vw,6px)] font-medium text-story-purple/80">
            Campaign landing
          </span>
          <div className="mt-[5%] text-[clamp(11px,3.6vw,17px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Turn clicks
            <br />
            into <span className="text-story-purple">leads</span>
          </div>
          <p className="mt-[4%] max-w-[90%] text-[clamp(5.5px,1.5vw,7px)] leading-[1.65] text-text/40">
            One page. One goal. Built for ads, forms and measurable results.
          </p>
          <div className="mt-[6%] flex gap-[6%]">
            {['+240%', 'Leads', '14 days'].map((item) => (
              <div key={item}>
                <div className="text-[clamp(7px,2vw,9px)] font-bold text-text">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center border-s border-black/[0.05] bg-secondary/40 px-[6%] py-[5%]">
          <div className="w-full rounded-[6%] border border-black/[0.06] bg-white p-[8%] shadow-[0_8px_28px_-10px_rgba(124,58,237,0.12)]">
            <div className="text-[clamp(6px,1.6vw,7.5px)] font-semibold text-text/70">Get a callback</div>
            <div className="mt-[6%] space-y-[4%]">
              <div className="h-[clamp(8px,2.2vw,10px)] rounded-[2px] border border-black/[0.07] bg-secondary/50" />
              <div className="h-[clamp(8px,2.2vw,10px)] rounded-[2px] border border-black/[0.07] bg-secondary/50" />
            </div>
            <div className="mt-[7%] rounded-full bg-story-purple py-[3%] text-center text-[clamp(5.5px,1.5vw,7px)] font-semibold text-white">
              Send request
            </div>
            <div className="mt-[5%] flex items-center justify-center gap-[3%]">
              <div className="flex -space-x-[6%]">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-[clamp(6px,1.8vw,8px)] w-[clamp(6px,1.8vw,8px)] rounded-full border border-white bg-secondary"
                  />
                ))}
              </div>
              <span className="text-[clamp(5px,1.3vw,6px)] text-text/35">120+ this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
