import { Box, Typography } from '@mui/material';
import { HumanDolly } from 'mdi-material-ui';
import { VehicleList } from '../VehicleList';
import { VehicleCard } from '../VehicleCard';
import { TimedOutVehiclesHeader } from './TimedOutVehiclesHeader';
import type { ReactNode } from 'react';
import type { CardAttributes } from '../VehicleCard';

export interface VehiclesDigestViewAttributes {
  operationalVehicles: (CardAttributes & { id: string })[];
  timedOutVehicles: (CardAttributes & { id: string })[];
}

export function VehiclesDigestView({
  operationalVehicles,
  timedOutVehicles,
}: VehiclesDigestViewAttributes) {
  if (operationalVehicles.length === 0 && timedOutVehicles.length === 0)
    return <NoVehicles />;

  return (
    <PageContainer>
      <Box sx={{ width: '100%' }}>
        <PageTitle />
        <Box sx={{ marginTop: 2 }}>
          <VehicleList>
            {operationalVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                title={vehicle.title}
                subtitle={vehicle.subtitle}
                icon={vehicle.icon}
                color={vehicle.color}
              />
            ))}
          </VehicleList>
          {timedOutVehicles.length > 0 ? (
            <>
              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <TimedOutVehiclesHeader />
              </Box>
              <VehicleList>
                {timedOutVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    title={vehicle.title}
                    subtitle={vehicle.subtitle}
                    icon={vehicle.icon}
                    color={vehicle.color}
                  />
                ))}
              </VehicleList>
            </>
          ) : null}
        </Box>
      </Box>
    </PageContainer>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: '100%', padding: 1.4 }}>{children}</Box>;
}

function PageTitle() {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="grey"
      fontWeight="medium"
      lineHeight={1}
    >
      Vozila
    </Typography>
  );
}

function NoVehicles() {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'grey' }}>
        <Box sx={{ fontSize: '180px' }}>
          <HumanDolly fontSize={'inherit'} htmlColor={'grey'} />
        </Box>
        <Typography variant={'h5'}>Naručujemo GPS uređaje</Typography>
        <span>
          Biti ćete obaviješteni kad stignu i kad ih instaliramo u vozila
        </span>
      </Box>
    </Box>
  );
}
