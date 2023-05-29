import { MapMarker } from '../Map';
import { FinishIcon, padding, size } from './Icons';
import { startFinishMarkerIndex } from './ZIndex';
import type { Coordinates } from '../../lib/Dimension';

export interface FinishMarkerAttributes {
  coordinates: Coordinates;
}

export function FinishMarker({ coordinates }: FinishMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={size / 2}
      iconAnchorY={size - padding}
      zIndex={startFinishMarkerIndex}
    >
      <FinishIcon />
    </MapMarker>
  );
}
