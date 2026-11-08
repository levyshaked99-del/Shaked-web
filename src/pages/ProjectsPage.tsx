import { useCallback, useRef, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { SiteNav } from '../components/layout/SiteNav'
import { GlowOrb } from '../components/ui/GlowOrb'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { ProjectDetailsModal } from '../components/ProjectsSection/ProjectDetailsModal'
import { ProjectSlide } from '../components/ProjectsSection/ProjectSlide'
import { ProjectsClosing, ProjectsHero } from '../components/ProjectsSection/ProjectsPageParts'
import { PROJECTS, type Project } from '../components/ProjectsSection/projectsData'
import { usePageMeta } from '../hooks/usePageMeta'

export function ProjectsPage() {
  usePageMeta('projects')
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openDetails = useCallback((project: Project, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    setModalProject(project)
  }, [])

  const closeDetails = useCallback(() => {
    setModalProject(null)
  }, [])

  return (
    <>
      <GrainOverlay />
      <div className="relative bg-white">
        <GlowOrb tone="blue" size="xl" opacity={0.03} className="-right-[12%] top-[12%] hidden md:block" aria-hidden />
        <GlowOrb tone="violet" size="lg" opacity={0.02} className="-left-[10%] top-[35%]" aria-hidden />

        <SiteNav fixed />

        <main id="main-content" className="relative scroll-smooth">
          <ProjectsHero />

          {PROJECTS.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              id={project.id}
              index={index}
              onOpenDetails={openDetails}
            />
          ))}

          <ProjectsClosing />
        </main>
      </div>
      <Footer showCta={false} />

      <ProjectDetailsModal
        project={modalProject}
        onClose={closeDetails}
        returnFocusEl={returnFocusRef.current}
      />
    </>
  )
}
