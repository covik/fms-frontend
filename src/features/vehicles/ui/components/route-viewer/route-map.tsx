import { useState } from 'react';
import { AppMap, MapBounds } from '#core/map';
import { CombinedRoute, useRouteMapBounds } from '../route-map-elements';
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

  const { bounds } = useRouteMapBounds(checkpoints, stops);

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
