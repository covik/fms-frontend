import { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { padding, size, StopIcon } from './Icons';
import { Coordinates } from '../../lib/Dimension';
import { stopMarkerIndex } from './ZIndex';
import { jsxToSVGDataURI } from '../../utils/react';

const icon: google.maps.Icon = {
  url: jsxToSVGDataURI(<StopIcon />),
  anchor: {
    x: size / 2,
    y: size - padding,
  } as google.maps.Point,
  labelOrigin: {
    x: size / 2,
    y: -11,
  } as google.maps.Point,
};

export interface StopMarkerAttributes {
  coordinates: Coordinates;
  duration: string;
}

export function StopMarker({ coordinates, duration }: StopMarkerAttributes) {
  const latitude = coordinates.latitude();
  const longitude = coordinates.longitude();
  const position = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );

  const label: google.maps.MarkerLabel = useMemo(
    () => ({
      text: duration,
      fontFamily: 'FiraGO',
      fontWeight: '400',
      color: 'white',
      fontSize: '12px',
      className: 'trip-stop-marker-label',
    }),
    [duration],
  );

  return (
    <Marker
      position={position}
      icon={icon}
      label={label}
      zIndex={stopMarkerIndex}
    />
  );
}
