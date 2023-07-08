import { MapMarker } from '#core/map';
import {
  routeIconSize as size,
  routeIconPadding as padding,
  RouteFinishIcon,
} from '../icons';
import { startFinishMarkerIndex } from '../z-index';
import type { Coordinates } from '#lib/dimension';

export interface FinishMarkerAttributes {
  coordinates: Coordinates;
}

export function RouteFinishMarker({ coordinates }: FinishMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={size / 2}
      iconAnchorY={size - padding}
      zIndex={startFinishMarkerIndex}
    >
      <RouteFinishIcon />
    </MapMarker>
  );
}
