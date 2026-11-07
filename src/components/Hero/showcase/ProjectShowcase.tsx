import { useRef } from 'react'
import { HERO_PROJECTS, HERO_PROJECT_COUNT, type HeroProject } from './heroProjectsData'
import { useProjectShowcase } from './useProjectShowcase'

function ProjectIndicators({
  index,
  onSelect,
}: {
  index: number
  onSelect: (next: number) => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 md:gap-2" role="tablist" aria-label="פרויקטים">
      {HERO_PROJECTS.map((project, i) => (
        <button
          key={project.id}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`פרויקט ${project.number}`}
          onClick={() => onSelect(i)}
          className={[
            'rounded-full transition-all duration-300',
            'h-1.5 md:h-[5px]',
            i === index ? 'w-5 bg-text/70 md:w-7' : 'w-1.5 bg-black/[0.12] md:w-[5px]',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

function ProjectPreviewFrame({ project }: { project: HeroProject }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#111] md:rounded-2xl">
      <img
        src={project.previewImage}
        alt={`תצוגה מקדימה של ${project.title}`}
        className="h-full w-full"
        style={{
          objectFit: project.objectFit ?? 'cover',
          objectPosition: project.objectPosition ?? 'top',
        }}
        loading="eager"
        decoding="async"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]"
        aria-hidden
      />
    </div>
  )
}

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { index, direction, goTo, prefersReducedMotion, onTouchStart, onTouchEnd } =
    useProjectShowcase()

  const project = HERO_PROJECTS[index]
  const paddedNumber = project.number.padStart(2, '0')
  const totalPadded = String(HERO_PROJECT_COUNT).padStart(2, '0')
  const transitionClass = prefersReducedMotion
    ? 'project-showcase-enter--static'
    : direction > 0
      ? 'project-showcase-enter--next'
      : 'project-showcase-enter--prev'

  return (
    <div
      ref={containerRef}
      className="relative w-full min-w-0"
      aria-roledescription="תצוגת פרויקטים"
      aria-label={`פרויקט ${paddedNumber} מתוך ${totalPadded}`}
      onTouchStart={(event) => onTouchStart(event.touches[0]?.clientX ?? 0)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <div className="relative min-w-0" dir="rtl">
        <div className="mb-2 flex items-center justify-between gap-3 md:mb-3">
          <span className="text-[11px] tabular-nums tracking-[0.16em] text-muted md:text-xs">
            {paddedNumber} / {totalPadded}
          </span>
          <span className="max-w-[58%] truncate text-end text-[11px] text-text/55 md:max-w-[55%] md:text-xs">
            {project.category}
          </span>
        </div>

        <div key={project.id} className={['project-showcase-enter gpu-layer', transitionClass].join(' ')}>
          <ProjectPreviewFrame project={project} />
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-3 md:mt-3">
          <p className="truncate text-xs font-medium text-text/75 md:text-sm">{project.title}</p>
          <ProjectIndicators
            index={index}
            onSelect={(next) => goTo(next, next > index ? 1 : -1)}
          />
        </div>
      </div>
    </div>
  )
}
