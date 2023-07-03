import { MapMarker } from '#core/map';
import { padding, size, StartIcon } from './Icons';
import { startFinishMarkerIndex } from './ZIndex';
import type { Coordinates } from '#lib/Dimension';

export interface StartMarkerAttributes {
  coordinates: Coordinates;
}

export function StartMarker({ coordinates }: StartMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={size / 2}
      iconAnchorY={size - padding}
      zIndex={startFinishMarkerIndex}
    >
      <StartIcon />
    </MapMarker>
  );
}
