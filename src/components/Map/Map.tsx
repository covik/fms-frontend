import { useMemo } from 'react';
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

const mapOptions = {
  googleMapsApiKey: 'AIzaSyCRzHH5N9W0FWKvY5qhRbk9H-AHm-vs8rw',
  version: '3.51',
};

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
  const { isLoaded } = useJsApiLoader(mapOptions);

  const center = useMemo(
    () => ({
      lat: x,
      lng: y,
    }),
    [x, y],
  );

  const mapCss = useMemo(() => ({ width, height }), [width, height]);

  const styles = useMemo(
    () => [
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: noLabels ? 'off' : 'on' }],
      },
    ],
    [noLabels],
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: noControls,
      styles,
      streetViewControl: false,
    }),
    [noControls, styles],
  );

  const map = () => (
    <GoogleMap
      center={center}
      zoom={z}
      mapContainerStyle={mapCss}
      mapContainerClassName="google-map-root"
      options={options}
    >
      {children}
    </GoogleMap>
  );

  return isLoaded ? map() : <div>Učitvanje mape...</div>;
}
