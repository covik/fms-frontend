import { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { FinishIcon, padding, size } from './Icons';
import { Coordinates } from '../../lib/Dimension';
import { startFinishMarkerIndex } from './ZIndex';
import { jsxToSVGDataURI } from '../../utils/react';

const icon: google.maps.Icon = {
  url: jsxToSVGDataURI(<FinishIcon />),
  anchor: {
    x: size / 2,
    y: size - padding,
  } as google.maps.Point,
};

export interface FinishMarkerAttributes {
  coordinates: Coordinates;
}

export function FinishMarker({ coordinates }: FinishMarkerAttributes) {
  const latitude = coordinates.latitude();
  const longitude = coordinates.longitude();
  const position = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );

  return (
    <Marker position={position} icon={icon} zIndex={startFinishMarkerIndex} />
  );
}
