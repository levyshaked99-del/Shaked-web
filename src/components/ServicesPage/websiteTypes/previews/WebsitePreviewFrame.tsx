interface WebsitePreviewFrameProps {
  src: string
  alt: string
}

export function WebsitePreviewFrame({ src, alt }: WebsitePreviewFrameProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ECECEB]" role="img" aria-label={alt}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
