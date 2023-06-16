import { MapMarker } from '../Map';
import { padding, size, StopIcon } from './Icons';
import { stopMarkerIndex } from './ZIndex';
import type { Coordinates } from '../../lib/Dimension';

export interface StopMarkerAttributes {
  coordinates: Coordinates;
  duration: string;
}

export function StopMarker({ coordinates, duration }: StopMarkerAttributes) {
  return (
    <MapMarker
      position={coordinates}
      iconAnchorX={size / 2}
      iconAnchorY={size - padding}
      label={duration}
      labelOriginX={size / 2}
      labelOriginY={-11}
      labelColor={'white'}
      labelFontSize={'12px'}
      labelFontWeight={'400'}
      labelClass={'vehicle-stop-marker-label'}
      zIndex={stopMarkerIndex}
    >
      <StopIcon />
    </MapMarker>
  );
}
