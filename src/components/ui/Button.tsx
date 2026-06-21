type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "solid" | "toggle";
  active?: boolean; // only used by the "toggle" variant
};

export default function Button({
  variant = "outline",
  active = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "font-body text-xs tracking-[0.2em] uppercase rounded-full transition-colors";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    outline:
      "border border-electric-blue/30 text-electric-blue/80 hover:border-electric-blue/70 hover:text-electric-blue px-4 py-2",
    solid: "bg-neon-cyan text-graphite hover:bg-neon-cyan/80 px-4 py-3 w-full",
    toggle: active
      ? "border border-neon-cyan text-neon-cyan px-4 py-1.5"
      : "border border-deep-space text-soft-white/50 hover:border-neon-cyan/40 px-4 py-1.5",
  };

  return (
    <button
      data-cursor-hover
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
