import { useEffect, useMemo, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  useGoogleMap,
} from '@react-google-maps/api';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface MapArguments {
  x: number;
  y: number;
  z: number;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  loadingElement: ReactElement;
  noControls?: boolean;
  noLabels?: boolean;
  gestureHandling?: boolean;
  onZoomChanged?: (zoom: number) => void;
  fitBounds?: google.maps.LatLngLiteral[];
  clickablePoi?: boolean;
  children?: ReactNode | ReactNode[] | undefined;
}

const mapOptions = {
  googleMapsApiKey: 'AIzaSyCRzHH5N9W0FWKvY5qhRbk9H-AHm-vs8rw',
  version: '3.53',
};

export function Map({
  x,
  y,
  z,
  width,
  height,
  loadingElement,
  noControls = false,
  noLabels = false,
  gestureHandling = true,
  onZoomChanged,
  fitBounds,
  clickablePoi = true,
  children,
}: MapArguments) {
  const { isLoaded } = useJsApiLoader(mapOptions);
  const mapRef = useRef<google.maps.Map>();

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

  const options: google.maps.MapOptions = useMemo(
    () => ({
      disableDefaultUI: noControls,
      styles,
      streetViewControl: false,
      gestureHandling: gestureHandling ? 'auto' : 'none',
      clickableIcons: clickablePoi,
    }),
    [noControls, styles, clickablePoi],
  );

  useEffect(() => {
    if (mapRef.current && Array.isArray(fitBounds) && fitBounds.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      fitBounds.forEach((bound) => bounds.extend(bound));
      mapRef.current?.fitBounds(bounds);
    }
  }, [fitBounds, mapRef.current]);

  const map = () => (
    <GoogleMap
      center={center}
      zoom={z}
      mapContainerStyle={mapCss}
      mapContainerClassName="google-map-root"
      options={options}
      onZoomChanged={() => {
        if (mapRef.current === undefined) return;
        const currentZoom = mapRef.current?.getZoom();
        if (currentZoom && typeof onZoomChanged === 'function')
          onZoomChanged(currentZoom);
      }}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {children}
    </GoogleMap>
  );

  return isLoaded ? map() : loadingElement;
}

export interface MapBoundsArguments {
  coordinates: google.maps.LatLngLiteral[];
  once?: boolean;
}

export function MapBounds({
  coordinates,
  once = false,
}: MapBoundsArguments): null {
  const map = useGoogleMap();
  const [boundsApplied, setBoundsApplied] = useState(false);

  useEffect(() => {
    if (!map) return;
    if (once && boundsApplied) return;
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0)
      return;

    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach((coordinate) => bounds.extend(coordinate));
    map.fitBounds(bounds);
    setBoundsApplied(true);
  }, [map, coordinates, once, boundsApplied]);

  return null;
}
