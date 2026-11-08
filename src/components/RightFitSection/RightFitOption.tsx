interface RightFitOptionProps {
  id: string
  label: string
  description: string
  selected: boolean
  onSelect: () => void
}

export function RightFitOptionButton({ id, label, description, selected, onSelect }: RightFitOptionProps) {
  return (
    <button
      type="button"
      id={id}
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full rounded-xl border px-4 py-3.5 text-start transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-story-purple/35 focus-visible:ring-offset-2 md:px-5 md:py-4 ${
        selected
          ? 'border-story-purple/35 bg-story-purple-soft/40 shadow-depth-sm'
          : 'border-black/[0.08] bg-white hover:border-black/[0.12] hover:bg-secondary/30'
      }`}
    >
      <span className="block text-[0.9375rem] font-semibold text-text">{label}</span>
      {description ? (
        <span className="mt-1 block text-sm leading-relaxed text-text/55">{description}</span>
      ) : null}
    </button>
  )
}
