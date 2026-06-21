"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const SmartCityCanvas = dynamic(() => import("@/scenes/SmartCityCanvas"), {
  ssr: false,
});

export default function SmartCitySection() {
  const { ref, inView } = useInView<HTMLDivElement>("300px");

  return (
    <section
      id="smart-city"
      ref={ref}
      className="relative h-[180vh] border-t border-deep-space"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {inView && <SmartCityCanvas />}

        <div className="absolute top-16 left-0 right-0 text-center px-6 pointer-events-none z-10">
          <h2 className="font-display text-3xl sm:text-5xl">
            Future Urban Ecosystems
          </h2>
        </div>
      </div>
    </section>
  );
}
