import { Box, Typography } from '@mui/material';
import { VehicleList } from '../VehicleList';
import { VehicleCard } from '../VehicleCard';
import { TimedOutVehiclesHeader } from './TimedOutVehiclesHeader';
import type { CardAttributes } from '../VehicleCard';

export interface VehiclesDigestViewAttributes {
  operationalVehicles: (CardAttributes & { id: string })[];
  timedOutVehicles: (CardAttributes & { id: string })[];
}

export function VehiclesDigestView({
  operationalVehicles,
  timedOutVehicles,
}: VehiclesDigestViewAttributes) {
  return (
    <>
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
    </>
  );
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
