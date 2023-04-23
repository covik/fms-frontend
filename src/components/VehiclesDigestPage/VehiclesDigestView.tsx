import { Box, Typography, useTheme } from '@mui/material';
import { VehicleList } from '../VehicleList';
import { VehicleCard } from '../VehicleCard';
import type { CardAttributes } from '../VehicleCard';

export interface VehiclesDigestViewAttributes {
  vehicles: (CardAttributes & { id: string })[];
}

export function VehiclesDigestView({ vehicles }: VehiclesDigestViewAttributes) {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(1.4) }}>
      <PageTitle />
      <Box sx={{ marginTop: theme.spacing(2) }}>
        <VehicleList>
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              title={vehicle.title}
              subtitle={vehicle.subtitle}
              icon={vehicle.icon}
              color={vehicle.color}
            />
          ))}
        </VehicleList>
      </Box>
    </Box>
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
