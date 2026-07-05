export function PreviewNav({ logo, items, cta }: { logo: string; items: string[]; cta?: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between px-[7%] py-[3.5%]">
      <span className="text-[clamp(7px,2.2vw,10px)] font-semibold tracking-[0.18em] text-current">{logo}</span>
      <div className="hidden items-center gap-[5%] sm:flex">
        {items.map((item) => (
          <span key={item} className="text-[clamp(5.5px,1.6vw,7.5px)] opacity-40">
            {item}
          </span>
        ))}
      </div>
      {cta ? (
        <span className="rounded-full border border-current/15 px-[5%] py-[1.2%] text-[clamp(5px,1.4vw,7px)] font-medium opacity-80">
          {cta}
        </span>
      ) : (
        <span className="w-[12%]" />
      )}
    </div>
  )
}
