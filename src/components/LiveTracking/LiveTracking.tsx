import { useMemo } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import {
  FixedPage,
  PagePadding,
  VehicleMapIcon,
  VehicleMapMarker,
} from '#ui/atoms';
import { AppMap, MapBounds } from '../Map';
import type { ReactNode } from 'react';

export function LiveTracking() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: Vehicle.takeOnlyOperational,
    refetchInterval: 2000,
  });

  const operationalVehicles = query.data ?? [];

  const bounds = useMemo(
    () =>
      operationalVehicles.map((vehicle) => vehicle.position().coordinates()),
    [operationalVehicles],
  );

  return (
    <FixedPage>
      <PageContainer>
        <AppMap sx={{ height: 'auto', width: '100%' }}>
          {query.isFetching ? <FetchIndicator /> : null}
          <MapBounds coordinates={bounds} once />
          {operationalVehicles.map((vehicle) => (
            <VehicleMapMarker
              key={vehicle.id()}
              position={vehicle.position().coordinates()}
              name={vehicle.name()}
            >
              <VehicleMapIcon
                ignitionOn={vehicle.hasIgnitionTurnedOn()}
                moving={vehicle.isInMotion()}
                angleInDegrees={vehicle.course().value()}
              />
            </VehicleMapMarker>
          ))}
        </AppMap>
      </PageContainer>
    </FixedPage>
  );
}

function PageContainer({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <PagePadding flex={1} display={'flex'}>
      {children}
    </PagePadding>
  );
}

function FetchIndicator() {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 1,
        position: 'absolute',
        zIndex: 1,
        bottom: '10px',
        left: '10px',
      }}
    >
      <CircularProgress
        sx={{ display: 'block' }}
        disableShrink={true}
        thickness={5}
        size={20}
      />
    </Paper>
  );
}
