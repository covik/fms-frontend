import { ClassNames } from '@emotion/react';
import { MapMarker } from '#core/map';
import type { ReactElement } from 'react';
import type { Coordinates } from '#lib/Dimension';

export interface VehicleMapMarkerAttributes {
  position: Coordinates;
  name: string;
  children: ReactElement;
}

export function VehicleMapMarker({
  position,
  name,
  children,
}: VehicleMapMarkerAttributes) {
  return (
    <ClassNames>
      {({ css }) => (
        <MapMarker
          position={position}
          iconAnchorX={16}
          iconAnchorY={16}
          label={name}
          labelClass={css({
            backgroundColor: '#bababa',
            padding: '1px 4px',
            borderRadius: '5px',
          })}
          labelColor={'#444'}
          labelFontWeight={'500'}
          labelOriginX={16}
          labelOriginY={45}
        >
          {children}
        </MapMarker>
      )}
    </ClassNames>
  );
}
