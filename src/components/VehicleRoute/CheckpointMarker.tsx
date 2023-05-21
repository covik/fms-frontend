import { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { Coordinates } from '../../lib/Dimension';
import { jsxToSVGDataURI } from '../../utils/react';
import { checkpointMarkerIndex } from './ZIndex';
import type { ReactElement } from 'react';

export interface CheckpointMarkerAttributes {
  coordinates: Coordinates;
  children: ReactElement;
}

export function CheckpointMarker({
  coordinates,
  children,
}: CheckpointMarkerAttributes) {
  const lat = coordinates.latitude();
  const lng = coordinates.longitude();
  const latLng = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const svgDataURI = jsxToSVGDataURI(children);
  const icon: google.maps.Icon = useMemo(
    () => ({
      url: svgDataURI,
      anchor: {
        x: 16,
        y: 16,
      } as google.maps.Point,
    }),
    [svgDataURI],
  );

  return (
    <Marker position={latLng} icon={icon} zIndex={checkpointMarkerIndex} />
  );
}
