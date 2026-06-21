"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import WorldCameraRig from "@/scenes/WorldCameraRig";
import HolographicGrid from "@/scenes/HolographicGrid";
import CityScape from "@/scenes/CityScape";
import { DistantSkyline, generateDistantSkyline } from "@/scenes/DistantSkyline";
import StarField from "@/scenes/StarField";
import Effects from "@/scenes/Effects";
import { TrafficFlows, DataStreams, EnergyPulses } from "@/scenes/SmartCitySystems";
import { ProjectLandmarks } from "@/scenes/ProjectLandmarks";
import { generateCity } from "@/scenes/cityBuildings";
import { useIntroState } from "@/hooks/useIntroState";
import { useQualityTier } from "@/hooks/useQualityTier";
import { useSectionScrollRange } from "@/hooks/useSectionScrollRange";
import { useProjectSelection } from "@/hooks/useProjectSelection";
import { ScrollTrigger } from "@/utils/gsap";

/**
 * The entire page lives inside ONE persistent Canvas, fixed behind the
 * scrolling HTML content for the whole document. This replaces three
 * separate canvases (Hero's CanvasBackground, SmartCitySection's
 * SmartCityCanvas, FinalCinematicSection's FinalCanvas) that each mounted
 * fresh, reset the camera, and rebuilt the same city from scratch as the
 * user scrolled past their section. Now there's one world, one camera path
 * (see WorldCameraRig), one building layout generated once and shared with
 * every system that needs it, and overlay systems (traffic/data/energy,
 * stars) simply fade in or out as scroll crosses certain thresholds rather
 * than the whole scene unmounting and remounting.
 *
 * Overlay/star visibility is anchored to the real measured position of the
 * "smart-city" and "final" sections (via useSectionScrollRange) rather
 * than hardcoded fractions of total page height — the same reasoning as
 * WorldCameraRig's waypoint anchoring: a fixed fraction breaks the moment
 * any section's height changes.
 */

// Overlays (traffic/data/energy particles) are shown only while the
// "smart-city" section is the active part of the journey — the moment
// the camera is actually rising above the skyline. Stars fade in starting
// partway into the "final" section's orbit-out.

export default function WorldScene() {
  const { introDone } = useIntroState();
  const tier = useQualityTier();
  const { selected, select } = useProjectSelection();
  const buildingCount = tier === "low" ? 36 : 81;

  // Generated once per buildingCount (i.e. once per quality tier resolved
  // on mount) and reused everywhere — CityScape renders these buildings,
  // DataStreams/EnergyPulses route particles between these SAME building
  // positions, so what's on screen and what the particles travel between
  // always match.
  const buildings = useMemo(() => generateCity(buildingCount), [buildingCount]);

  // Sparse background silhouette ring — skipped on the low tier (weaker
  // mobile devices) since it's pure atmosphere, not core content, and the
  // fog/stars already do most of the work of filling distance there.
  const skylineBuildings = useMemo(
    () => (tier === "low" ? [] : generateDistantSkyline()),
    [tier]
  );

  const [overlaysVisible, setOverlaysVisible] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);

  const smartCityRange = useSectionScrollRange("smart-city");
  const finalRange = useSectionScrollRange("final");

  // Whole-document scroll progress drives which overlay layers are shown,
  // measured against each anchor section's real position (see hook above)
  // rather than a guessed fraction of total page height.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const { start: scStart, end: scEnd } = smartCityRange.current;
        const { start: finStart } = finalRange.current;
        setOverlaysVisible(p >= scStart && p <= scEnd);
        // Stars ease in starting a third of the way into the final
        // orbit-out section, so they're established by the time the
        // camera reaches the high climax waypoint.
        setStarsVisible(p >= finStart + (1 - finStart) * 0.3);
      },
    });
    return () => trigger.kill();
  }, [smartCityRange, finalRange]);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={tier === "low" ? [1, 1] : [1, 2]} gl={{ antialias: true }}>
        {/* Fog reaches well past the camera's farthest waypoint (0,95,75 ≈
            distance 124 from origin) so nothing pops in/out of view at the
            climax — distant grid + skyline silhouette fade into it instead
            of being clipped. */}
        <fog attach="fog" args={["#0a0a0b", 12, 150]} />
        <WorldCameraRig />

        <HolographicGrid />
        <CityScape buildings={buildings} rise={introDone} detail={tier === "high"} />
        <ProjectLandmarks activeId={selected?.id ?? null} onSelect={select} />
        {skylineBuildings.length > 0 && (
          <DistantSkyline buildings={skylineBuildings} />
        )}

        <group visible={overlaysVisible}>
          <TrafficFlows />
          <DataStreams buildings={buildings} />
          <EnergyPulses buildings={buildings} />
        </group>

        <group visible={starsVisible}>
          <StarField count={tier === "low" ? 300 : 800} />
        </group>

        {tier === "high" && <Effects />}
      </Canvas>
    </div>
  );
}
