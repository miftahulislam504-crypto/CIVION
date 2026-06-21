"use client";

import { useMemo } from "react";
import { generateCity, type Building } from "@/scenes/cityBuildings";
import { BuildingGroup } from "@/scenes/BuildingGroup";
import { TrafficFlows, DataStreams, EnergyPulses } from "@/scenes/SmartCitySystems";

export type { Building };

export default function SmartCityGrid({
  count = 81,
  detail = true,
}: {
  count?: number;
  detail?: boolean;
}) {
  const buildings = useMemo(() => generateCity(count), [count]);

  return (
    <group>
      {buildings.map((building, i) => (
        <BuildingGroup key={i} building={building} detail={detail} />
      ))}

      <TrafficFlows />
      <DataStreams buildings={buildings} />
      <EnergyPulses buildings={buildings} />
    </group>
  );
}
