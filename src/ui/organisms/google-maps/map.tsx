import { useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Coordinates } from '#lib/dimension';
import { MapTypeControl } from './map-type-control';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { UseLoadScriptOptions } from '@react-google-maps/api/dist/useJsApiLoader';

const mapOptions: UseLoadScriptOptions = {
  googleMapsApiKey: 'AIzaSyCRzHH5N9W0FWKvY5qhRbk9H-AHm-vs8rw',
  version: '3.53',
  libraries: ['places'],
};

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
  clickablePoi?: boolean;
  onContextMenu?: (coordinates: Coordinates) => void;
  onClick?: () => void;
  children?: ReactNode | ReactNode[] | undefined;
}

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
  clickablePoi = true,
  onContextMenu = undefined,
  onClick = undefined,
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
      mapTypeControl: false,
      fullscreenControlOptions: {
        position: 9,
      },
    }),
    [noControls, styles, clickablePoi],
  );

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
      onClick={onClick}
      onRightClick={
        onContextMenu
          ? (event) => {
              if (!event.latLng) return;
              onContextMenu(
                new Coordinates(event.latLng.lat(), event.latLng.lng()),
              );
            }
          : undefined
      }
    >
      {noControls ? null : <MapTypeControl />}
      {children}
    </GoogleMap>
  );

  return isLoaded ? map() : loadingElement;
}
Map.displayName = 'GoogleMaps.Map';
