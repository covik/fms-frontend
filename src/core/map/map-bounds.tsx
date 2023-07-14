import { useMemo } from 'react';
import { GoogleMaps } from '#ui/organisms/google-maps';
import { Coordinates } from '#lib/dimension';

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

export interface MapBoundsPositions
  extends Array<Coordinatable & Identifiable> {}

export interface MapBoundsAPI {
  bounds: Coordinates[];
  key: string;
}

export function useCreateMapBounds(
  positions: MapBoundsPositions,
  overrideKey?: string,
): MapBoundsAPI {
  const bounds = useMemo(() => computeBounds(positions), [positions]);

  const key = useMemo(
    () => overrideKey ?? computeKey(positions),
    [positions, overrideKey],
  );

  return {
    bounds,
    key,
  };
}

interface Identifiable {
  id: string;
}

interface Coordinatable {
  latitude: number;
  longitude: number;
}

function computeKey(positions: Identifiable[]): string {
  return positions.map((position) => position.id).join('=');
}

function computeBounds(positions: Coordinatable[]): Coordinates[] {
  return positions.map(
    (position) => new Coordinates(position.latitude, position.longitude),
  );
}
