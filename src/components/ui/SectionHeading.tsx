type EyebrowColor = "neon-cyan" | "electric-blue" | "warm-orange";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowColor?: EyebrowColor;
  title: string;
  subtitle?: string;
  className?: string;
};

const COLOR_MAP: Record<EyebrowColor, string> = {
  "neon-cyan": "text-neon-cyan",
  "electric-blue": "text-electric-blue",
  "warm-orange": "text-warm-orange",
};

export default function SectionHeading({
  eyebrow,
  eyebrowColor = "neon-cyan",
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl mx-auto text-center mb-16 ${className}`}>
      {eyebrow && (
        <span
          className={`font-body text-xs tracking-[0.3em] uppercase ${COLOR_MAP[eyebrowColor]}`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-5xl mt-4">{title}</h2>
      {subtitle && (
        <p className="font-body text-sm sm:text-base text-soft-white/60 mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
