type BrandMarkProps = {
  size?: number
  className?: string
}

/** Site mark — purple growth chart icon (matches favicon / brand-icon). */
export function BrandMark({ size = 36, className = '' }: BrandMarkProps) {
  return (
    <img
      src="/brand-icon.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-[22%] ${className}`}
      decoding="async"
    />
  )
}