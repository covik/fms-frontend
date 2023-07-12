import { useMemo } from 'react';
import { Polyline } from '@react-google-maps/api';
import type { CSSProperties } from 'react';
import type { RoutePositionData } from './interface';

export interface RouteLineAttributes {
  points: Pick<RoutePositionData, 'latitude' | 'longitude'>[];
  color: CSSProperties['color'];
}

export function RouteLine({ points, color }: RouteLineAttributes) {
  const latLngPath = useMemo(
    () =>
      points?.map((checkpoint) => ({
        lat: checkpoint.latitude,
        lng: checkpoint.longitude,
      })),
    [points],
  );

  if (!points) return null;

  return (
    <Polyline
      path={latLngPath}
      options={{
        clickable: false,
        strokeColor: color,
        strokeWeight: 5,
      }}
    />
  );
}
