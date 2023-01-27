import { VehicleAttributes, VehicleCard } from './VehicleCard';
import { Box, useTheme } from '@mui/material';

const vehicles: (VehicleAttributes & { id: string })[] = [
  {
    id: 'test-01',
    name: 'ZD000AA',
    ignition: true,
    movement: 'moving',
  },
];

export function VehicleOverviewPage() {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(1) }}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          name={vehicle.name}
          movement={vehicle.movement}
          ignition={vehicle.ignition}
        />
      ))}
    </Box>
  );
}
