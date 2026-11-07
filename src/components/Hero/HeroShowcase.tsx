import { WebsiteBuildShowcase } from './showcase/WebsiteBuildShowcase'

export function HeroShowcase() {
  return (
    <div className="mx-auto w-full max-w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-[252px] md:max-w-[480px] lg:max-w-[580px] max-md:pb-1">
        <WebsiteBuildShowcase />
      </div>
    </div>
  )
}
