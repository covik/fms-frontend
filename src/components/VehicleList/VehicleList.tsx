import { VehicleCard } from '../VehicleCard';
import { Box } from '@mui/material';
import type { CardAttributes } from '../VehicleCard';

export interface VehicleListAttributes {
  vehicles: (CardAttributes & { id: string })[];
}

export function VehicleList({ vehicles }: VehicleListAttributes) {
  return (
    <Box sx={{ ...spaceOutChildren() }}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          title={vehicle.title}
          subtitle={vehicle.subtitle}
          icon={vehicle.icon}
          color={vehicle.color}
        />
      ))}
    </Box>
  );
}

function spaceOutChildren() {
  return {
    '> *:not(:last-child)': { marginBottom: 2 },
  };
}
