import type { ProjectPreviewPresentation } from './projectsData'

/** Shared stage aspect — matches project PNG captures (~1024×558). */
export const PREVIEW_STAGE_ASPECT = 1024 / 558

interface ProjectPreviewFrameProps {
  imageSrc: string
  title: string
  presentation: ProjectPreviewPresentation
}

export function ProjectPreviewFrame({ imageSrc, title, presentation }: ProjectPreviewFrameProps) {
  const { fit, position = 'top center', background = 'secondary' } = presentation
  const bgClass = background === 'white' ? 'bg-white' : 'bg-secondary/60'

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -end-6 -top-4 h-[55%] w-[45%] rounded-full bg-story-purple/[0.12] blur-3xl md:-end-10 md:-top-6"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-4 bottom-0 h-[40%] w-[38%] rounded-full bg-story-purple/[0.08] blur-3xl md:-start-8"
        aria-hidden
      />

      <div
        className={`relative w-full overflow-hidden rounded-[20px] border border-black/[0.06] shadow-depth-lg transition-shadow duration-500 group-hover/preview:shadow-[0_40px_100px_-28px_rgba(0,0,0,0.14)] md:rounded-[24px] ${bgClass}`}
        style={{ aspectRatio: String(PREVIEW_STAGE_ASPECT) }}
      >
        <div className="flex h-full w-full items-center justify-center p-2 md:p-3">
          <img
            src={imageSrc}
            alt={`תצוגה מקדימה של ${title}`}
            className={`max-h-full max-w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            style={{ objectPosition: position }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}
