import { useMemo } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Coordinates } from '#lib/dimension';
import type { ReactNode } from 'react';

export interface MapInfoWindowAttributes {
  coordinates: Coordinates;
  children: ReactNode;
}

export function MapInfoWindow({
  coordinates,
  children,
}: MapInfoWindowAttributes) {
  const latitude = coordinates.latitude();
  const longitude = coordinates.longitude();

  const position = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude],
  );

  return <InfoWindow position={position}>{children}</InfoWindow>;
}
