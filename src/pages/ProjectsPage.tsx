import { Footer } from '../components/layout/Footer'
import { SiteNav } from '../components/layout/SiteNav'
import { GlowOrb } from '../components/ui/GlowOrb'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { ProjectSlide } from '../components/ProjectsSection/ProjectSlide'
import { ProjectsIntro } from '../components/ProjectsSection/ProjectsPageParts'
import { PROJECTS } from '../components/ProjectsSection/projectsData'
import { usePageMeta } from '../hooks/usePageMeta'

export function ProjectsPage() {
  usePageMeta('projects')

  return (
    <>
      <GrainOverlay />
      <div className="relative bg-white">
        <GlowOrb tone="blue" size="xl" opacity={0.04} className="-right-[12%] top-[15%] hidden md:block" aria-hidden />
        <GlowOrb tone="violet" size="lg" opacity={0.03} className="-left-[10%] bottom-[20%]" aria-hidden />

        <SiteNav fixed />

        <main
          id="main-content"
          className="relative h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
        >
          <ProjectsIntro />

          {PROJECTS.map((project) => (
            <ProjectSlide key={project.id} project={project} id={project.id} />
          ))}
        </main>
      </div>
      <Footer />
    </>
  )
}
