"use client";

/**
 * Used to mount its own SmartCityCanvas here. The city is now rendered
 * once, globally, by WorldScene (see layout.tsx) — this section just marks
 * the scroll range where WorldCameraRig's path rises above the skyline,
 * and shows the matching text overlay while that's happening.
 */
export default function SmartCitySection() {
  return (
    <section id="smart-city" className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-0 right-0 text-center px-6 z-10">
          <h2 className="font-display text-3xl sm:text-5xl">
            Future Urban Ecosystems
          </h2>
        </div>
      </div>
    </section>
  );
}
