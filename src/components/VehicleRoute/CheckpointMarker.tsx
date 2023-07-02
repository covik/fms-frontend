import { MapMarker } from '#core/map';
import { checkpointMarkerIndex } from './ZIndex';
import type { ReactElement } from 'react';
import type { Coordinates } from '../../lib/Dimension';

export interface CheckpointMarkerAttributes {
  coordinates: Coordinates;
  onClick?: () => void;
  children: ReactElement;
}

export function CheckpointMarker({
  coordinates,
  onClick,
  children,
}: CheckpointMarkerAttributes) {
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
