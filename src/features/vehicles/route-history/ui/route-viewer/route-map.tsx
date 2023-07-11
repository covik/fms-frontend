import { useMemo, useState } from 'react';
import { AppMap, MapBounds } from '#core/map';
import { Coordinates } from '#lib/dimension';
import { CombinedRoute } from '../route-map-elements';
import type {
  RoutePositionData,
  RouteStopData,
} from '../route-map-elements/interface';

export interface RouteMapAttributes {
  checkpoints: RoutePositionData[];
  stops: RouteStopData[];
}

export function RouteMap({ checkpoints, stops }: RouteMapAttributes) {
  const [checkpointsVisible, showCheckpoints] = useState(false);

  const bounds = useMemo(
    () => calculateMapBounds([...checkpoints, ...stops]),
    [checkpoints, stops],
  );

  return (
    <AppMap
      onZoomChanged={(zoom) => {
        showCheckpoints(zoom >= 15);
      }}
      sx={{ height: '100%' }}
    >
      <MapBounds coordinates={bounds} />
      <CombinedRoute
        checkpoints={checkpoints}
        stops={stops}
        showCheckpoints={checkpointsVisible}
      />
    </AppMap>
  );
}

interface Coordinatable {
  latitude: number;
  longitude: number;
}

function calculateMapBounds(positions: Coordinatable[]): Coordinates[] {
  return positions.map(
    (position) => new Coordinates(position.latitude, position.longitude),
  );
}
