import { Box, Typography, useTheme } from '@mui/material';
import { VehicleList } from '../VehicleList';
import type { VehicleListAttributes } from '../VehicleList';

export interface VehiclesDigestViewAttributes {
  vehicles: VehicleListAttributes['vehicles'];
}

export function VehiclesDigestView({ vehicles }: VehiclesDigestViewAttributes) {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(1.4) }}>
      <PageTitle />
      <Box sx={{ marginTop: theme.spacing(2) }}>
        <VehicleList vehicles={vehicles} />
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
