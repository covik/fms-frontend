import { useEffect, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Card, Skeleton, styled } from '@mui/material';
import type { SxProps } from '@mui/material';
import type { CSSProperties, ReactNode } from 'react';

export interface MapArguments {
  x: number;
  y: number;
  z: number;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  noControls?: boolean;
  noLabels?: boolean;
  gestureHandling?: boolean;
  onZoomChanged?: (zoom: number) => void;
  fitBounds?: google.maps.LatLngLiteral[];
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
  gestureHandling = true,
  onZoomChanged,
  fitBounds,
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
    }),
    [noControls, styles],
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

  return isLoaded ? map() : <MapSkeleton />;
}

const defaultPadding = 1;

type AppMapAttributes = Omit<MapArguments, 'width' | 'height'> & {
  sx: SxProps;
};

const MapContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export function AppMap(props: AppMapAttributes) {
  const { sx, ...mapProps } = props;

  return (
    <Card sx={{ padding: defaultPadding, ...sx }}>
      <MapContainer>
        <Map {...mapProps} width={'100%'} height={'100%'} />
      </MapContainer>
    </Card>
  );
}

function MapSkeleton() {
  const mapControlsPadding = 10;
  const paddingPx = `${mapControlsPadding}px`;

  return (
    <>
      <Skeleton variant={'rectangular'} width={'100%'} height={'100%'} />
      <Skeleton
        variant={'rectangular'}
        width={150}
        height={40}
        sx={{ position: 'absolute', top: paddingPx, left: paddingPx }}
        animation={false}
      />
      <Skeleton
        variant={'rectangular'}
        width={40}
        height={40}
        sx={{ position: 'absolute', top: paddingPx, right: paddingPx }}
        animation={false}
      />
      <Skeleton
        variant={'rectangular'}
        width={40}
        height={80}
        sx={{ position: 'absolute', bottom: paddingPx, right: paddingPx }}
        animation={'wave'}
      />
    </>
  );
}
