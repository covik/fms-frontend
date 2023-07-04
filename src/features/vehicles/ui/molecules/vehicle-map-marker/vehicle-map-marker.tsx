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
    <MapMarker
      position={position}
      iconAnchorX={16}
      iconAnchorY={16}
      label={name}
      labelClass={'vehicle-marker-label'}
      labelColor={'#444'}
      labelFontWeight={'500'}
      labelOriginX={16}
      labelOriginY={45}
    >
      {children}
    </MapMarker>
  );
}
