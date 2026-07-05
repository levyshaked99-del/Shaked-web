interface ProjectPreviewProps {
  imageSrc: string
  title: string
}

export function ProjectPreview({ imageSrc, title }: ProjectPreviewProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#111]">
      <img
        src={imageSrc}
        alt={`תצוגה מקדימה של ${title}`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
