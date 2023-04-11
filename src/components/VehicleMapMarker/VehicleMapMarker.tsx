import { Marker } from '@react-google-maps/api';
import { renderToString } from 'react-dom/server';
import type { MarkerProps } from '@react-google-maps/api';
import type { ReactElement } from 'react';

export interface VehicleMapMarkerAttributes {
  position: MarkerProps['position'];
  name: string;
  children: ReactElement;
}

export function VehicleMapMarker({
  position,
  name,
  children,
}: VehicleMapMarkerAttributes) {
  const iconContentFromSvg = renderToString(children);
  const urlEncodedIconContent = encodeURIComponent(iconContentFromSvg);
  const icon: google.maps.Icon = {
    url: `data:image/svg+xml,${urlEncodedIconContent}`,
    anchor: {
      x: 16,
      y: 16,
    } as google.maps.Point,
    labelOrigin: {
      x: 16,
      y: 45,
    } as google.maps.Point,
  };

  const label: google.maps.MarkerLabel = {
    text: name,
    className: 'vehicle-marker-label',
    color: '#444',
    fontWeight: '500',
    fontFamily: 'FiraGO',
  };

  return <Marker position={position} icon={icon} label={label} />;
}
