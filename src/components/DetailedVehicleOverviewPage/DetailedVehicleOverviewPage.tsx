import { Box, Card, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Map } from '../Map/Map';
import { LatestInformation } from './LatestInformation';

export interface DetailedVehicleOverviewPageAttributes {
  activeTab: 'live-updates' | 'routes' | 'maintenance';
}

export function DetailedVehicleOverviewPage({
  activeTab = 'live-updates',
}: DetailedVehicleOverviewPageAttributes) {
  const theme = useTheme();

  const tabs = [
    {
      id: 'live-updates',
      children: (
        <Box>
          <Card sx={{ height: '40vh', minHeight: '200px', marginBottom: 1.5 }}>
            <Map
              x={44.698832}
              y={16.373162}
              z={6}
              width="100%"
              height="100%"
              noControls
            />
          </Card>
          <LatestInformation />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: theme.spacing(1.4) }}>
      <Box sx={{ marginBottom: 1 }}>
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
      <Box sx={{ marginTop: 2 }}>
        {tabs.map(({ id, children }) => {
          if (id === activeTab) return children;
          else return null;
        })}
      </Box>
      <Card>
        <Tabs value={activeTab} variant="fullWidth">
          <Tab value="live-updates" label="Uživo" />
          <Tab value="routes" label="Rute" />
          <Tab value="maintenance" label="Servisi" />
        </Tabs>
      </Card>
    </Box>
  );
}
