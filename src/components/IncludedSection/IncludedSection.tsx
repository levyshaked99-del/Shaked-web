import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { TrustSignals } from '../ui/TrustSignals'
import { FaqAccordion } from './FaqAccordion'
import { ImportantInfoBlock } from './ImportantInfoBlock'
import { IncludedAccordion } from './IncludedAccordion'
import { IncludedIllustration } from './IncludedIllustration'

export function IncludedSection() {
  const ref = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const mainInView = useInView(mainRef, { once: true, margin: '-80px' })
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })
  const faqInView = useInView(faqRef, { once: true, margin: '-60px' })

  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  return (
    <SectionShell ref={ref} id="included" tone="soft">
      <Reveal variant="blur" className="text-center">
        <h2 className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          כל מה שכלול בפרויקט שלך
        </h2>
        <p className="mx-auto mt-5 max-w-[580px] text-base leading-[1.75] text-text/60 md:text-lg">
          שקיפות מלאה. בלי הפתעות.
          <br className="hidden sm:block" />
          כל מה שצריך כדי לייצג את העסק בצורה מקצועית, מהירה ואמינה.
        </p>
      </Reveal>

      <TrustSignals inView={mainInView} delay={0.1} className="mt-10 md:mt-12" compact />

      <div ref={mainRef} className="mx-auto mt-14 max-w-[1100px] md:mt-20 lg:mt-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px] xl:gap-20">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-5 py-2 shadow-depth-lg md:rounded-[28px] md:px-10 md:py-4 lg:px-12">
              <IncludedAccordion inView={mainInView} onActiveChange={setActiveItemId} />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-28">
            <IncludedIllustration active={mainInView} activeItemId={activeItemId} />
          </div>
        </div>
      </div>

      <div ref={infoRef} className="mx-auto mt-16 max-w-[900px] md:mt-20">
        <ImportantInfoBlock inView={infoInView} />
      </div>

      <div ref={faqRef} className="mx-auto mt-16 max-w-[900px] md:mt-24 lg:mt-28">
        <FaqAccordion inView={faqInView} />
      </div>
    </SectionShell>
  )
}
