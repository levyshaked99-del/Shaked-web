import { useRef } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { RightFitQuestionnaire } from './RightFitQuestionnaire'
import { RIGHT_FIT_EYEBROW, RIGHT_FIT_HEADLINE, RIGHT_FIT_SUPPORTING } from './rightFitData'

export function RightFitSection() {
  const ref = useRef<HTMLElement>(null)

  return (
    <SectionShell ref={ref} id="right-fit" tone="bright" glow="none" className="py-20 md:py-28 lg:py-32">
      <Reveal variant="blur" className="text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-muted">{RIGHT_FIT_EYEBROW}</p>
        <h2
          id="right-fit-heading"
          className="mx-auto mt-5 max-w-[720px] text-[clamp(1.65rem,3.4vw,2.65rem)] font-bold leading-[1.14] tracking-tight text-text"
        >
          {RIGHT_FIT_HEADLINE}
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-base leading-[1.75] text-text/60 md:text-[1.0625rem]">
          {RIGHT_FIT_SUPPORTING}
        </p>
      </Reveal>

      <div className="mt-12 lg:mt-14" aria-labelledby="right-fit-heading">
        <RightFitQuestionnaire />
      </div>
    </SectionShell>
  )
}
