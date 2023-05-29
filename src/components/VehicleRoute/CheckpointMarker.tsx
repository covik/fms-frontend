import { MapMarker } from '../Map';
import { checkpointMarkerIndex } from './ZIndex';
import type { ReactElement } from 'react';
import type { Coordinates } from '../../lib/Dimension';

export interface CheckpointMarkerAttributes {
  coordinates: Coordinates;
  children: ReactElement;
}

export function CheckpointMarker({
  coordinates,
  children,
}: CheckpointMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={16}
      iconAnchorY={16}
      zIndex={checkpointMarkerIndex}
    >
      {children}
    </MapMarker>
  );
}
