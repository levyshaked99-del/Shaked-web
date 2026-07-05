interface CardGlowProps {
  active?: boolean
  tone?: 'blue' | 'violet' | 'dual'
}

export function CardGlow({ active = false, tone = 'dual' }: CardGlowProps) {
  const blueOpacity = active ? 0.12 : 0.06
  const violetOpacity = active ? 0.1 : 0.05

  if (tone === 'blue') {
    return (
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0.7,
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(37,99,235,${blueOpacity}) 0%, transparent 70%)`,
        }}
        aria-hidden
      />
    )
  }

  if (tone === 'violet') {
    return (
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0.7,
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,58,237,${violetOpacity}) 0%, transparent 70%)`,
        }}
        aria-hidden
      />
    )
  }

  return (
    <>
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.5rem] transition-opacity duration-500 md:-inset-8 md:rounded-[2.5rem]"
        style={{
          opacity: active ? 1 : 0.65,
          background: `radial-gradient(ellipse 55% 50% at 30% 45%, rgba(37,99,235,${blueOpacity}) 0%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.5rem] transition-opacity duration-500 md:-inset-8 md:rounded-[2.5rem]"
        style={{
          opacity: active ? 1 : 0.65,
          background: `radial-gradient(ellipse 55% 50% at 70% 55%, rgba(124,58,237,${violetOpacity}) 0%, transparent 70%)`,
        }}
        aria-hidden
      />
    </>
  )
}
