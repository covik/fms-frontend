import { AppMap, MapBounds } from '#core/map';
import {
  CombinedRoute,
  useRouteCheckpoints,
  useRouteMapBounds,
} from '../route-map-elements';
import type { RoutePositionData, RouteStopData } from '../../types/route';

export interface RouteMapAttributes {
  checkpoints: RoutePositionData[];
  stops: RouteStopData[];
}

export function RouteMap({ checkpoints, stops }: RouteMapAttributes) {
  const { checkpointsVisible, showCheckpointsOnDetailedMap } =
    useRouteCheckpoints();
  const { bounds } = useRouteMapBounds(checkpoints, stops);

  return (
    <AppMap
      onZoomChanged={showCheckpointsOnDetailedMap}
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
