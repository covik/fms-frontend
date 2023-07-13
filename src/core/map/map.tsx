import { useMemo } from 'react';
import { Card, Skeleton, styled } from '@mui/material';
import { GoogleMaps } from '#ui/organisms/google-maps';
import { useMapSettings } from './map-settings';
import { className as fetchIndicatorClass } from './map-fetch-indicator';
import type { SxProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface AppMapAttributes {
  sx: SxProps;
  noControls?: boolean;
  noLabels?: boolean;
  gestureHandling?: boolean;
  onZoomChanged?: (zoom: number) => void;
  clickablePoi?: boolean;
  children?: ReactNode | ReactNode[] | undefined;
}

const MapContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',

  [`& .${fetchIndicatorClass}`]: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
  },
});

const defaultPadding = 1;

export function AppMap(props: AppMapAttributes) {
  const { sx, ...mapProps } = props;
  const { center, zoom } = useMapSettings();

  const latitude = useMemo(() => center.latitude(), [center.latitude()]);
  const longitude = useMemo(() => center.longitude(), [center.longitude()]);

  return (
    <Card sx={{ padding: defaultPadding, ...sx }}>
      <MapContainer>
        <GoogleMaps.Map
          {...mapProps}
          x={latitude}
          y={longitude}
          z={zoom}
          width={'100%'}
          height={'100%'}
          loadingElement={<MapSkeleton />}
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
