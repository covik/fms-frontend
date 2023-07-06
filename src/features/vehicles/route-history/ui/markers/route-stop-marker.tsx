import { ClassNames } from '@emotion/react';
import { MapMarker } from '#core/map';
import {
  routeIconSize as size,
  routeIconPadding as padding,
  RouteStopIcon,
} from '../icons';
import { stopMarkerIndex } from '../z-index';
import type { Coordinates } from '#lib/Dimension';

export interface StopMarkerAttributes {
  coordinates: Coordinates;
  duration: string;
}

export function RouteStopMarker({
  coordinates,
  duration,
}: StopMarkerAttributes) {
  return (
    <ClassNames>
      {({ css }) => (
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
          labelClass={css({
            backgroundColor: '#333',
            padding: '1px 4px',
            borderRadius: '5px',
          })}
          zIndex={stopMarkerIndex}
        >
          <RouteStopIcon />
        </MapMarker>
      )}
    </ClassNames>
  );
}
