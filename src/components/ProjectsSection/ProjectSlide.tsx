import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { ProjectPreview } from './ProjectPreview'
import type { Project } from './projectsData'

interface ProjectSlideProps {
  project: Project
  id: string
}

export function ProjectSlide({ project, id }: ProjectSlideProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.45, margin: '-10% 0px' })
  const isExternal = Boolean(project.externalUrl)

  const previewMotion = {
    initial: { opacity: 0, y: 28, scale: 1.01 },
    animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.5, y: 16, scale: 1 },
    transition: { duration: 0.75, ease: EASE_PREMIUM, delay: 0.05 },
    whileHover: isExternal ? { scale: 1.01 } : undefined,
  }

  const previewClassName =
    'relative mt-5 block overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-depth-lg md:mt-6 md:rounded-[28px]'

  return (
    <section
      ref={ref}
      id={id}
      data-project-slide
      className="relative flex min-h-screen snap-start snap-always items-center px-6 py-28 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.span
          className="block text-sm tabular-nums tracking-[0.2em] text-muted md:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        >
          {project.number}
        </motion.span>

        {isExternal ? (
          <motion.a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${previewClassName} group/preview transition-shadow duration-300 hover:shadow-depth-lg`}
            aria-label={`פתיחת ${project.title} בכרטיסייה חדשה`}
            {...previewMotion}
          >
            {project.isDemo && (
              <span className="absolute start-4 top-4 z-10 rounded-full border border-black/[0.06] bg-white/92 px-3 py-1 text-[10px] font-semibold tracking-wide text-text/65 backdrop-blur-sm md:start-5 md:top-5 md:text-xs">
                פרויקט הדגמה
              </span>
            )}
            <div
              className="aspect-[16/10] max-h-[52vh] min-h-[220px] w-full md:max-h-[58vh]"
              role="img"
              aria-label={`תצוגה מקדימה של פרויקט ${project.title}`}
            >
              <ProjectPreview imageSrc={project.previewImage} title={project.title} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04]" aria-hidden />
          </motion.a>
        ) : (
          <motion.div className={previewClassName} {...previewMotion}>
            <div
              className="aspect-[16/10] max-h-[52vh] min-h-[220px] w-full md:max-h-[58vh]"
              role="img"
              aria-label={`תצוגה מקדימה של פרויקט ${project.title}`}
            >
              <ProjectPreview imageSrc={project.previewImage} title={project.title} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04]" aria-hidden />
          </motion.div>
        )}

        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 10 }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM, delay: 0.15 }}
        >
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-text">
              {project.title}
            </h2>
            <span className="text-sm text-muted md:text-base">{project.category}</span>
          </div>

          <p className="mt-5 max-w-[580px] text-[0.9375rem] leading-[1.85] text-text/55 md:text-base md:leading-[1.85]">
            {project.description}
          </p>

          <motion.div whileHover={{ x: -2 }}>
            {isExternal ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors duration-300 hover:text-brand"
              >
                צפה באתר
                <ExternalLink size={15} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
              </a>
            ) : (
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors duration-300 hover:text-brand"
              >
                צפה בפרויקט
                <ArrowLeft size={15} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
