import { useMemo } from 'react';
import { Polyline } from '@react-google-maps/api';
import type { CSSProperties } from 'react';
import type { RoutePosition } from '../../../models/position';

export interface RouteLineAttributes {
  checkpoints: RoutePosition[];
  color: CSSProperties['color'];
}

export function RouteLine({ checkpoints, color }: RouteLineAttributes) {
  const latLngPath = useMemo(
    () =>
      checkpoints.map((checkpoint) => ({
        lat: checkpoint.latitude(),
        lng: checkpoint.longitude(),
      })),
    [checkpoints],
  );

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
