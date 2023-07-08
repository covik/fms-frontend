import { MapMarker } from '#core/map';
import { checkpointMarkerIndex } from '../z-index';
import type { ReactElement } from 'react';
import type { Coordinates } from '#lib/dimension';

export interface RouteCheckpointMarkerAttributes {
  coordinates: Coordinates;
  onClick?: () => void;
  children: ReactElement;
}

export function RouteCheckpointMarker({
  coordinates,
  onClick,
  children,
}: RouteCheckpointMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={16}
      iconAnchorY={16}
      zIndex={checkpointMarkerIndex}
      onClick={onClick}
    >
      {children}
    </MapMarker>
  );
}
