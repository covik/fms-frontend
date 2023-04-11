import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import type { CSSProperties, ReactNode } from 'react';

export interface MapArguments {
  x: number;
  y: number;
  z: number;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  noControls?: boolean;
  noLabels?: boolean;
  children?: ReactNode | ReactNode[] | undefined;
}

export function Map({
  x,
  y,
  z,
  width,
  height,
  noControls = false,
  noLabels = false,
  children,
}: MapArguments) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCRzHH5N9W0FWKvY5qhRbk9H-AHm-vs8rw',
  });

  const styles = [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ visibility: noLabels ? 'off' : 'on' }],
    },
  ];

  const map = () => (
    <GoogleMap
      center={{ lat: x, lng: y }}
      zoom={z}
      mapContainerStyle={{ width, height }}
      mapContainerClassName="google-map-root"
      options={{
        disableDefaultUI: noControls,
        styles,
        streetViewControl: false,
      }}
    >
      {children}
    </GoogleMap>
  );

  return isLoaded ? map() : <div>Učitvanje mape...</div>;
}
