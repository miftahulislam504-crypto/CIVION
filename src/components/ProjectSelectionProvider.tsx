"use client";

import { useCallback, useState } from "react";
import { ProjectSelectionContext } from "@/hooks/useProjectSelection";
import { useLenis } from "@/hooks/useLenis";
import type { ProjectLandmark } from "@/scenes/projectLandmarks";

/**
 * Selecting a project temporarily takes over the camera (see
 * WorldCameraRig) and shows a detail panel — scroll needs to be locked
 * during that, the same way IntroLoader locks scroll during the boot
 * sequence, otherwise the user could scroll the page while the camera is
 * mid-flight into a building, fighting the zoom transition.
 */
export default function ProjectSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<ProjectLandmark | null>(null);
  const lenis = useLenis();

  const select = useCallback(
    (landmark: ProjectLandmark) => {
      setSelected(landmark);
      lenis?.stop();
    },
    [lenis]
  );

  const close = useCallback(() => {
    setSelected(null);
    lenis?.start();
  }, [lenis]);

  return (
    <ProjectSelectionContext.Provider value={{ selected, select, close }}>
      {children}
    </ProjectSelectionContext.Provider>
  );
}
