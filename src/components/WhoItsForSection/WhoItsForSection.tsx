import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { WhoItsForCard } from './WhoItsForCard'
import {
  WHO_ITS_FOR_AUDIENCES,
  WHO_ITS_FOR_EYEBROW,
  WHO_ITS_FOR_HEADLINE,
  WHO_ITS_FOR_SUPPORTING,
} from './whoItsForData'

export function WhoItsForSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = usePrefersReducedMotion()

  return (
    <SectionShell
      ref={ref}
      id="who-its-for"
      tone="bright"
      glow="none"
      className="py-20 md:py-28 lg:py-32"
    >
      <Reveal variant="blur" className="text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-story-purple/75">{WHO_ITS_FOR_EYEBROW}</p>
        <h2
          id="who-its-for-heading"
          className="mx-auto mt-5 max-w-[720px] text-[clamp(1.65rem,3.4vw,2.65rem)] font-bold leading-[1.14] tracking-tight text-text"
        >
          {WHO_ITS_FOR_HEADLINE}
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-base leading-[1.75] text-text/60 md:text-[1.0625rem]">
          {WHO_ITS_FOR_SUPPORTING}
        </p>
      </Reveal>

      <ul
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        aria-labelledby="who-its-for-heading"
      >
        {WHO_ITS_FOR_AUDIENCES.map((audience, index) => (
          <li key={audience.id} className="list-none">
            <WhoItsForCard
              audience={audience}
              index={index}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
