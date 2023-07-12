import { useMemo } from 'react';
import { Coordinates } from '#lib/dimension';
import type { RoutePositionData, RouteStopData } from './interface';

export function useRouteMapBounds(
  checkpoints: RoutePositionData[],
  stops?: RouteStopData[],
) {
  const positions = useMemo(
    () => [...checkpoints, ...(stops ?? [])],
    [checkpoints, stops],
  );

  const key = useMemo(() => computeKey(positions), [positions]);
  const bounds = useMemo(() => computeBounds(positions), [positions]);

  return {
    key,
    bounds,
  };
}

interface Identifiable {
  id: string;
}

interface Coordinatable {
  latitude: number;
  longitude: number;
}

function computeKey(positions: Identifiable[]): string {
  return positions.map((position) => position.id).join('=');
}

function computeBounds(positions: Coordinatable[]): Coordinates[] {
  return positions.map(
    (position) => new Coordinates(position.latitude, position.longitude),
  );
}
