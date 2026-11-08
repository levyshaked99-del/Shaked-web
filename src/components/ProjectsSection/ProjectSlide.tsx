import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { ProjectPreviewFrame } from './ProjectPreviewFrame'
import type { Project } from './projectsData'

interface ProjectSlideProps {
  project: Project
  id: string
  index: number
  onOpenDetails: (project: Project, trigger: HTMLElement) => void
}

const CTA_PRIMARY =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-depth-sm transition-shadow duration-300 hover:shadow-depth-md'
const CTA_SECONDARY =
  'inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/[0.1] bg-white px-7 py-3 text-sm font-semibold text-text transition-colors duration-300 hover:border-black/[0.14]'

export function ProjectSlide({ project, id, index, onOpenDetails }: ProjectSlideProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2, margin: '-6% 0px' })
  const imageOnVisualLeft = index % 2 === 0

  /** LTR grid: col 1 is always the 62% track when image is left; col 1 is 38% when image is right */
  const gridCols = imageOnVisualLeft
    ? 'lg:grid-cols-[1.35fr_0.65fr]'
    : 'lg:grid-cols-[0.65fr_1.35fr]'

  const previewPlacement = imageOnVisualLeft
    ? 'lg:col-start-1 lg:row-start-1'
    : 'lg:col-start-2 lg:row-start-1'
  const infoPlacement = imageOnVisualLeft
    ? 'lg:col-start-2 lg:row-start-1'
    : 'lg:col-start-1 lg:row-start-1'

  const sectionPadding =
    index === 0
      ? 'pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-16 lg:pb-32'
      : 'py-20 md:py-28 lg:py-36'

  const infoBlock = (
    <motion.div
      className="relative flex flex-col justify-center lg:py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 12 }}
      transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.1 }}
    >
      <div
        className="pointer-events-none absolute -end-2 -top-6 h-[clamp(3.5rem,10vw,6rem)] w-[clamp(3rem,8vw,5rem)] rounded-full bg-black/[0.04] md:-top-10"
        aria-hidden
      />

      <span className="inline-flex w-fit rounded-full border border-story-purple/20 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5B21B6]">
        {project.conceptLabel}
      </span>

      <h2 className="mt-5 text-[clamp(1.85rem,3.2vw,2.65rem)] font-bold leading-[1.1] tracking-tight text-text">
        {project.title}
      </h2>
      <p className="mt-2 text-sm text-text/70">{project.industryLine}</p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-text">{project.industryEn}</p>

      <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.85] text-text/70">{project.conceptDescription}</p>

      <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-text/65 md:text-xs">
        {project.capabilities.map((cap, i) => (
          <li key={cap} className="flex items-center gap-2">
            {i > 0 && <span className="text-story-purple/35" aria-hidden>·</span>}
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${CTA_PRIMARY}`}
        >
          צפה באתר
          <ArrowLeft size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
        </a>
        <button
          type="button"
          className={CTA_SECONDARY}
          onClick={(e) => onOpenDetails(project, e.currentTarget)}
        >
          פרטים על הפרויקט
        </button>
      </div>
    </motion.div>
  )

  const previewBlock = (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 14 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.04 }}
    >
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group/preview block w-full"
        aria-label={`פתיחת ${project.title} בכרטיסייה חדשה`}
      >
        <ProjectPreviewFrame
          imageSrc={project.previewImage}
          title={project.title}
          presentation={project.previewPresentation}
        />
      </a>
    </motion.div>
  )

  return (
    <section ref={ref} id={id} className={`relative bg-white px-6 md:px-10 lg:px-16 ${sectionPadding}`}>
      <div className="mx-auto w-full max-w-[1240px]">
        <div
          className={`lg:grid ${gridCols} lg:items-center lg:gap-12 lg:[direction:ltr] xl:gap-16`}
        >
          <div className={`${previewPlacement} w-full min-w-0`}>{previewBlock}</div>
          <div dir="rtl" className={`${infoPlacement} mt-12 w-full min-w-0 lg:mt-0`}>
            {infoBlock}
          </div>
        </div>
      </div>
    </section>
  )
}
