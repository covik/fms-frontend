import { Box, CircularProgress, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import { AppMap } from '../Map';
import { VehicleMapMarker } from '../VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../VehicleMapIcon';
import type { ReactNode } from 'react';

export function LiveTracking() {
  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: Vehicle.takeOnlyOperational,
    refetchInterval: 2000,
  });

  const operationalVehicles = query.data ?? [];

  return (
    <PageContainer>
      <AppMap sx={{ height: 'auto', width: '100%' }}>
        {query.isFetching ? <FetchIndicator /> : null}
        {operationalVehicles.map((vehicle) => (
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
      </AppMap>
    </PageContainer>
  );
}

function PageContainer({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        padding: 1,
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
