"use client";

import { createContext, useContext } from "react";
import type { ProjectLandmark } from "@/scenes/projectLandmarks";

/**
 * Selecting a project landmark needs to affect two places at once that
 * don't otherwise talk to each other: WorldCameraRig (deep inside the
 * Canvas, needs to redirect the camera toward the landmark) and the DOM
 * detail panel (outside the Canvas, shows the project's text/stats).
 * Context avoids prop-drilling the selection through WorldScene's JSX
 * into the Canvas tree.
 */
export type ProjectSelectionState = {
  selected: ProjectLandmark | null;
  select: (landmark: ProjectLandmark) => void;
  close: () => void;
};

export const ProjectSelectionContext = createContext<ProjectSelectionState>({
  selected: null,
  select: () => {},
  close: () => {},
});

export function useProjectSelection() {
  return useContext(ProjectSelectionContext);
}
