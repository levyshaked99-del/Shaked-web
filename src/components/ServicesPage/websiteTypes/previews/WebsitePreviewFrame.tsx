import { LandingPagePreview } from './LandingPagePreview'
import { BusinessPagePreview } from './BusinessPagePreview'
import { PremiumPagePreview } from './PremiumPagePreview'
import type { PreviewCrop } from '../websiteTypesData'

const PREVIEWS = {
  landing: LandingPagePreview,
  business: BusinessPagePreview,
  premium: PremiumPagePreview,
} as const

interface WebsitePreviewFrameProps {
  crop: PreviewCrop
}

export function WebsitePreviewFrame({ crop }: WebsitePreviewFrameProps) {
  const Preview = PREVIEWS[crop] ?? BusinessPagePreview

  return (
    <div className="h-full w-full overflow-hidden bg-[#ECECEB]" role="img" aria-hidden>
      <Preview />
    </div>
  )
}
