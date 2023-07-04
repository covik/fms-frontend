import { MapMarker } from '#core/map';
import {
  routeIconSize as size,
  routeIconPadding as padding,
  RouteStartIcon,
} from '../icons';
import { startFinishMarkerIndex } from '../z-index';
import type { Coordinates } from '#lib/Dimension';

export interface RouteStartMarkerAttributes {
  coordinates: Coordinates;
}

export function RouteStartMarker({ coordinates }: RouteStartMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={size / 2}
      iconAnchorY={size - padding}
      zIndex={startFinishMarkerIndex}
    >
      <RouteStartIcon />
    </MapMarker>
  );
}
