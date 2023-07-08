import { useMemo, useState } from 'react';
import { AppMap, MapBounds } from '#core/map';
import { VehicleRoute, VehicleRouteStops } from '../route';
import type { Coordinates } from '#lib/dimension';
import type { RoutePosition } from '../../../models/position';
import type { RouteStop } from '../../../models/route-stop';

const routeColor = '#BA68C8';

export interface RouteMapAttributes {
  routes: RoutePosition[];
  stops: RouteStop[];
}

export function RouteMap({ routes, stops }: RouteMapAttributes) {
  const [checkpointsVisible, showCheckpoints] = useState(false);

  const bounds = useMemo(
    () => calculateMapBounds(routes, stops),
    [routes, stops],
  );

  return (
    <AppMap
      onZoomChanged={(zoom) => {
        showCheckpoints(zoom >= 15);
      }}
      sx={{ height: '100%' }}
    >
      <MapBounds coordinates={bounds} />
      <VehicleRoute
        positions={routes}
        color={routeColor}
        showCheckpoints={checkpointsVisible}
      />
      <VehicleRouteStops stops={stops} />
    </AppMap>
  );
}

function calculateMapBounds(
  positions: RoutePosition[],
  stops: RouteStop[],
): Coordinates[] {
  const positionCoordinates = positions.map((position) =>
    position.coordinates(),
  );
  const stopCoordinates = stops.map((stop) => stop.coordinates());

  return positionCoordinates.concat(stopCoordinates);
}
