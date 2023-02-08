import { Box, Card, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Map } from '../Map/Map';

export interface DetailedVehicleOverviewPageAttributes {
  activeTab: 'live-updates' | 'info' | 'routes' | 'maintenance';
}

export function DetailedVehicleOverviewPage({
  activeTab = 'live-updates',
}: DetailedVehicleOverviewPageAttributes) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(1.4),
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Typography
          component="h1"
          variant="h4"
          color="grey"
          fontWeight="medium"
          lineHeight={1}
        >
          ZD001AA
        </Typography>
      </Box>
      <Card sx={{ flexGrow: 1, marginTop: 0.5, marginBottom: 1.4 }}>
        <Map
          x={44.698832}
          y={16.373162}
          z={6}
          width="100%"
          height="100%"
          noControls
        />
      </Card>
      <Card sx={{ flexGrow: 0 }}>
        <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
          <Tab value="live-updates" label="Karta" />
          <Tab value="info" label="Info" />
          <Tab value="routes" label="Rute" />
          <Tab value="maintenance" label="Servisi" />
        </Tabs>
      </Card>
    </Box>
  );
}
