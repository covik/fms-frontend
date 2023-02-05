import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import type { CSSProperties } from 'react';

export interface MapArguments {
  x: number;
  y: number;
  z: number;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export function Map({ x, y, z, width, height }: MapArguments) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCRzHH5N9W0FWKvY5qhRbk9H-AHm-vs8rw',
  });

  const map = () => (
    <GoogleMap
      center={{ lat: x, lng: y }}
      zoom={z}
      mapContainerStyle={{ width, height }}
    />
  );

  return isLoaded ? map() : <div>Učitvanje mape...</div>;
}
