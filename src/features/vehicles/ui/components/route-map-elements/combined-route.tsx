import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Coordinates } from '#lib/dimension';
import { ROUTE_COLOR } from './constants';
import { RouteFinishMarker, RouteStartMarker } from './markers';
import { RouteCheckpoints } from './route-checkpoints';
import { RouteLine } from './route-line';
import { RouteStops } from './route-stops';
import type { CSSProperties } from 'react';
import type { RoutePositionData, RouteStopData } from '../../types/route';

export interface CombinedRouteAttributes {
  checkpoints: RoutePositionData[];
  stops?: RouteStopData[];
  color?: CSSProperties['color'];
  showCheckpoints?: boolean;
}

export function CombinedRoute({
  checkpoints,
  stops = [],
  color = ROUTE_COLOR,
  showCheckpoints = false,
}: CombinedRouteAttributes) {
  const { selectedCheckpoint, selectCheckpoint, clearSelection } =
    useCheckpointSelection();

  const hasCheckpoints = checkpoints.length > 1;
  const hasStops = stops && stops.length > 0;

  const firstPosition = hasCheckpoints ? checkpoints[0] : undefined;
  const lastPosition = hasCheckpoints
    ? checkpoints[checkpoints.length - 1]
    : undefined;

  useEffect(() => {
    if (!showCheckpoints) clearSelection();
  }, [showCheckpoints]);

  return (
    <>
      {hasCheckpoints ? <RouteLine points={checkpoints} color={color} /> : null}
      {firstPosition ? (
        <RouteStartMarker
          coordinates={
            new Coordinates(firstPosition.latitude, firstPosition.longitude)
          }
        />
      ) : null}
      {lastPosition ? (
        <RouteFinishMarker
          coordinates={
            new Coordinates(lastPosition.latitude, lastPosition.longitude)
          }
        />
      ) : null}
      {hasCheckpoints && showCheckpoints ? (
        <RouteCheckpoints
          checkpoints={checkpoints}
          color={color}
          onClick={selectCheckpoint}
          selectedCheckpointId={selectedCheckpoint?.id ?? ''}
        />
      ) : null}
      {hasStops ? <RouteStops stops={stops} /> : null}
    </>
  );
}

function useCheckpointSelection() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<
    RoutePositionData | undefined
  >(undefined);

  function clearSelection() {
    setSelectedCheckpoint(() => undefined);
  }

  function selectCheckpoint(newPosition: RoutePositionData) {
    flushSync(() => clearSelection());
    setSelectedCheckpoint(() => newPosition);
  }

  return {
    selectedCheckpoint,
    selectCheckpoint,
    clearSelection,
  };
}
