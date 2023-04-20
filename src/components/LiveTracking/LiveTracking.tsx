import { Box, CircularProgress, Paper, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import { Coordinates } from '../../lib/Dimension';
import { OperationalVehicle } from '../../models/Vehicle';
import { Map } from '../Map';
import { VehicleMapMarker } from '../VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../VehicleMapIcon';
import type { ReactNode } from 'react';

const CROATIA = {
  coordinates: new Coordinates(44.698832, 16.373162),
  zoom: 7,
};

export function LiveTracking() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => fetchVehicles(signal),
    refetchInterval: 2000,
  });

  if (query.data === undefined)
    return (
      <PageContainer>
        <MapSkeleton />
      </PageContainer>
    );

  return (
    <PageContainer>
      {query.isFetching ? <FetchIndicator /> : null}
      <Map
        x={CROATIA.coordinates.latitude()}
        y={CROATIA.coordinates.longitude()}
        z={CROATIA.zoom}
        height={'100%'}
        width={'100%'}
      >
        {query.data.map((vehicle) => (
          <VehicleMapMarker
            key={vehicle.id()}
            position={{
              lat: vehicle.position().latitude(),
              lng: vehicle.position().longitude(),
            }}
            name={vehicle.name()}
          >
            {vehicle.isInMotion() ? (
              <VehicleMapIconMoving
                active={vehicle.hasIgnitionTurnedOn()}
                angle={vehicle.course().value()}
              />
            ) : (
              <VehicleMapIconStationary
                active={vehicle.hasIgnitionTurnedOn()}
              />
            )}
          </VehicleMapMarker>
        ))}
      </Map>
    </PageContainer>
  );
}

async function fetchVehicles(
  signal?: AbortSignal,
): Promise<OperationalVehicle[]> {
  const vehicles = await Vehicle.fetchAll(signal);

  return vehicles.filter(
    (vehicle): vehicle is OperationalVehicle =>
      vehicle instanceof OperationalVehicle,
  );
}

function PageContainer({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {children}
    </Box>
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

function MapSkeleton() {
  return (
    <>
      <Skeleton variant={'rectangular'} width={'100%'} height={'100%'} />
      <Skeleton
        variant={'rectangular'}
        width={150}
        height={40}
        sx={{ position: 'absolute', top: '10px', left: '10px' }}
        animation={false}
      />
      <Skeleton
        variant={'rectangular'}
        width={40}
        height={40}
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
        animation={false}
      />
      <Skeleton
        variant={'rectangular'}
        width={40}
        height={80}
        sx={{ position: 'absolute', bottom: '10px', right: '10px' }}
        animation={'wave'}
      />
      <Skeleton
        variant={'rectangular'}
        width={40}
        height={40}
        sx={{ position: 'absolute', bottom: '110px', right: '10px' }}
        animation={'wave'}
      />
    </>
  );
}
