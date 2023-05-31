import { useMemo } from 'react';
import { Card, Skeleton, styled } from '@mui/material';
import { useMapSettings } from './MapSettings';
import { Map as GoogleMap } from './GoogleMap';
import type { SxProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { Coordinates } from '../../lib/Dimension';

export interface AppMapAttributes {
  sx: SxProps;
  noControls?: boolean;
  noLabels?: boolean;
  gestureHandling?: boolean;
  onZoomChanged?: (zoom: number) => void;
  clickablePoi?: boolean;
  fitBounds?: Coordinates[];
  children?: ReactNode | ReactNode[] | undefined;
}

const MapContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

const defaultPadding = 1;

export function AppMap(props: AppMapAttributes) {
  const { sx, fitBounds, ...mapProps } = props;
  const { center, zoom } = useMapSettings();

  const latitude = useMemo(() => center.latitude(), [center.latitude()]);
  const longitude = useMemo(() => center.longitude(), [center.longitude()]);

  const coordinateBoundsToMapBounds = useMemo(() => {
    if (!fitBounds || !Array.isArray(fitBounds) || fitBounds.length === 0)
      return undefined;

    return fitBounds.map((coordinate) => ({
      lat: coordinate.latitude(),
      lng: coordinate.longitude(),
    }));
  }, [fitBounds]);

  return (
    <Card sx={{ padding: defaultPadding, ...sx }}>
      <MapContainer>
        <GoogleMap
          {...mapProps}
          x={latitude}
          y={longitude}
          z={zoom}
          width={'100%'}
          height={'100%'}
          loadingElement={<MapSkeleton />}
          fitBounds={coordinateBoundsToMapBounds}
        />
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
