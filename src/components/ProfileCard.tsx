"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import GlassPanel from "@/components/ui/GlassPanel";
import { useInView } from "@/hooks/useInView";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SOCIALS: SocialLink[] = [
  {
    label: "Gmail",
    href: "mailto:miftahulislam504@gmail.com",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3.5 6 8.5 6.5L20.5 6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/miftahulislam504-crypto",
    icon: (
      <svg {...ICON_PROPS} strokeWidth={1.5}>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.58 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100070205770837",
    icon: (
      <svg {...ICON_PROPS} strokeWidth={1.5}>
        <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v3.5H8V21h3.5v-7.5h2.7l.5-3.5h-3.2V7.8c0-1 .3-1.7 1.7-1.7H15V3Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    disabled: true,
    icon: (
      <svg {...ICON_PROPS} strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M7.5 10.5v6M7.5 7.75v.01M11.5 16.5v-3.5c0-1.4.9-2.5 2.25-2.5S16 11.6 16 13v3.5" />
      </svg>
    ),
  },
];

export default function ProfileCard() {
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const cardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!inView || !cardRef.current) return;
    const card = cardRef.current;
    const links = linksRef.current.filter((el): el is HTMLAnchorElement => el !== null);

    const cardTween = gsap.fromTo(
      card,
      { opacity: 0, y: 32, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
        },
      }
    );

    const linksTween = gsap.fromTo(
      links,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
        },
      }
    );

    return () => {
      cardTween.scrollTrigger?.kill();
      cardTween.kill();
      linksTween.scrollTrigger?.kill();
      linksTween.kill();
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative max-w-md mx-auto">
      <div ref={cardRef} className="opacity-0">
        <GlassPanel className="p-8 sm:p-10 flex flex-col items-center text-center" showGrid>
          {/* Photo — rotating holographic ring around a circular frame */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6">
            <div className="absolute inset-0 rounded-full animate-civion-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="rgba(45,226,230,0.35)"
                  strokeWidth="1"
                  strokeDasharray="6 5"
                />
              </svg>
            </div>
            <div
              className="absolute inset-[6px] rounded-full overflow-hidden border border-neon-cyan/40"
              style={{ boxShadow: "0 0 24px rgba(45,226,230,0.25)" }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Miftahul Islam"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <span
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-neon-cyan animate-civion-pulse"
              style={{ boxShadow: "0 0 8px rgba(45,226,230,0.8)" }}
              aria-hidden
            />
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neon-cyan/60 mb-2">
            /////// Operator
          </p>
          <h3 className="font-mono text-2xl sm:text-3xl font-bold text-soft-white mb-1">
            Miftahul Islam
          </h3>
          <p className="font-mono text-xs text-soft-white/45 tracking-wide mb-8">
            Civil Engineering &middot; Building CIVION
          </p>

          {/* Social links */}
          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {SOCIALS.map((social, i) => (
              <a
                key={social.label}
                ref={(el) => { linksRef.current[i] = el; }}
                href={social.href}
                target={social.disabled ? undefined : "_blank"}
                rel={social.disabled ? undefined : "noopener noreferrer"}
                aria-label={social.disabled ? `${social.label} (coming soon)` : social.label}
                data-cursor-hover
                onClick={social.disabled ? (e) => e.preventDefault() : undefined}
                className={`group relative flex flex-col items-center gap-2 opacity-0 ${
                  social.disabled ? "cursor-default" : ""
                }`}
              >
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 ${
                    social.disabled
                      ? "border-soft-white/10 text-soft-white/25"
                      : "border-neon-cyan/25 text-neon-cyan/70 group-hover:border-neon-cyan group-hover:text-neon-cyan group-hover:shadow-[0_0_14px_rgba(45,226,230,0.35)] group-hover:-translate-y-0.5"
                  }`}
                >
                  {social.icon}
                </span>
                <span
                  className={`font-mono text-[8px] tracking-[0.12em] uppercase transition-colors ${
                    social.disabled
                      ? "text-soft-white/20"
                      : "text-soft-white/35 group-hover:text-neon-cyan/80"
                  }`}
                >
                  {social.disabled ? "Soon" : social.label}
                </span>
              </a>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
