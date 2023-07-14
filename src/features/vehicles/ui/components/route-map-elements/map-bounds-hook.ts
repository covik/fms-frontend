import { useMemo } from 'react';
import { useCreateMapBounds } from '#core/map';
import type { RoutePositionData, RouteStopData } from '../../types/route';

export function useRouteMapBounds(
  checkpoints: RoutePositionData[],
  stops?: RouteStopData[],
) {
  const positions = useMemo(
    () => [...checkpoints, ...(stops ?? [])],
    [checkpoints, stops],
  );

  return useCreateMapBounds(positions);
}
