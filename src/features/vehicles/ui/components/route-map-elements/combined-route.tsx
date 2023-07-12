import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Coordinates } from '#lib/dimension';
import { ROUTE_COLOR } from './constants';
import { RouteFinishMarker, RouteStartMarker } from './markers';
import { RouteCheckpoints } from './route-checkpoints';
import { RouteLine } from './route-line';
import { RouteStops } from './route-stops';
import type { CSSProperties } from 'react';
import type { RoutePositionData, RouteStopData } from './interface';

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
  const { selectedCheckpoint, selectCheckpoint } = useCheckpointSelection();

  if (checkpoints.length < 2) return null;

  const firstPosition = checkpoints[0];
  const lastPosition = checkpoints[checkpoints.length - 1];

  return (
    <>
      <RouteLine points={checkpoints} color={color} />
      <RouteStartMarker
        coordinates={
          new Coordinates(firstPosition.latitude, firstPosition.longitude)
        }
      />
      <RouteFinishMarker
        coordinates={
          new Coordinates(lastPosition.latitude, lastPosition.longitude)
        }
      />
      {showCheckpoints ? (
        <RouteCheckpoints
          checkpoints={checkpoints}
          color={color}
          onClick={selectCheckpoint}
          selectedCheckpointId={selectedCheckpoint?.id ?? ''}
        />
      ) : null}
      {stops && stops.length > 0 ? <RouteStops stops={stops} /> : null}
    </>
  );
}

function useCheckpointSelection() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<
    RoutePositionData | undefined
  >(undefined);

  function selectCheckpoint(newPosition: RoutePositionData) {
    flushSync(() => {
      setSelectedCheckpoint(() => undefined);
    });
    setSelectedCheckpoint(() => newPosition);
  }

  return {
    selectedCheckpoint,
    selectCheckpoint,
  };
}
