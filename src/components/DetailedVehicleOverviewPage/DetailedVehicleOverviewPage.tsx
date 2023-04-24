import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { RouteBrowser } from './RouteBrowser';
import { LivePreview } from './LivePreview';

export interface DetailedVehicleOverviewPageAttributes {
  activeTab: 'live-updates' | 'routes' | 'maintenance';
}

export function DetailedVehicleOverviewPage({
  activeTab = 'live-updates',
}: DetailedVehicleOverviewPageAttributes) {
  const tabs = [
    {
      id: 'live-updates',
      children: <LivePreview key={'live-preview'} />,
    },
    {
      id: 'routes',
      children: <RouteBrowser key={'route-browser'} />,
    },
  ];

  return (
    <Box sx={{ padding: 1 }}>
      <Typography
        component="h1"
        variant="h4"
        color="grey"
        fontWeight="regular"
        lineHeight={1}
        textAlign="center"
        marginBottom={0.5}
      >
        ZD001AA
      </Typography>
      <Card sx={{ marginBottom: 2 }}>
        <Tabs value={activeTab} variant="fullWidth">
          <Tab value="live-updates" label="Uživo" />
          <Tab value="routes" label="Rute" />
          <Tab value="maintenance" label="Servisi" />
        </Tabs>
      </Card>
      {tabs.map(({ id, children }) => {
        if (id === activeTab) return children;
        else return null;
      })}
    </Box>
  );
}
