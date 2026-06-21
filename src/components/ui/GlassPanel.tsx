type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  showGrid?: boolean;
  clipOverflow?: boolean;
  tone?: "deep-space" | "graphite";
};

const TONE_BG: Record<NonNullable<GlassPanelProps["tone"]>, string> = {
  "deep-space": "bg-deep-space/40",
  graphite: "bg-graphite/60",
};

export default function GlassPanel({
  children,
  className = "",
  showGrid = false,
  clipOverflow = false,
  tone = "deep-space",
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={`relative rounded-lg border border-neon-cyan/20 ${TONE_BG[tone]} backdrop-blur-sm ${
        clipOverflow ? "overflow-hidden" : ""
      } ${className}`}
      {...rest}
    >
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,226,230,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,226,230,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
