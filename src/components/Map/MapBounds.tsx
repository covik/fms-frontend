import { useMemo } from 'react';
import { GoogleMaps } from '#ui/organisms';
import type { Coordinates } from '../../lib/Dimension';

export interface MapBoundsAttributes {
  coordinates: Coordinates[];
  once?: boolean;
}

export function MapBounds({ coordinates, once = false }: MapBoundsAttributes) {
  const latLngArray = useMemo(
    () =>
      coordinates.map((coordinate) => ({
        lat: coordinate.latitude(),
        lng: coordinate.longitude(),
      })),
    [coordinates],
  );

  return <GoogleMaps.MapBounds coordinates={latLngArray} once={once} />;
}
