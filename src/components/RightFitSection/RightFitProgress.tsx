interface RightFitProgressProps {
  step: 1 | 2 | 3 | 4
}

export function RightFitProgress({ step }: RightFitProgressProps) {
  const label = `${String(step).padStart(2, '0')} / 04`

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs font-semibold tabular-nums tracking-[0.14em] text-text/45" aria-live="polite">
        {label}
      </p>
      <div className="flex flex-1 justify-end gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className={`h-1 w-8 rounded-full transition-colors duration-300 md:w-10 ${
              segment <= step ? 'bg-story-purple' : 'bg-black/[0.08]'
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
