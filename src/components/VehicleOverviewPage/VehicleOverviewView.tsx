import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export interface DetailedVehicleOverviewViewAttributes {
  activeTab: 'live-updates' | 'routes';
  title: string;
  children: ReactNode;
}

export function VehicleOverviewView({
  activeTab,
  title,
  children,
}: DetailedVehicleOverviewViewAttributes) {
  return (
    <Box sx={{ padding: 1 }}>
      <PageTitle>{title}</PageTitle>
      <Card sx={{ marginBottom: 2, marginTop: 1 }}>
        <Tabs value={activeTab} variant="fullWidth">
          <Tab value="live-updates" label="Uživo" />
          <Tab value="routes" label="Rute" />
        </Tabs>
      </Card>
      {children}
    </Box>
  );
}

function PageTitle({ children }: { children: string }) {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="grey"
      fontWeight="medium"
      lineHeight={1}
      textAlign={'left'}
    >
      {children}
    </Typography>
  );
}
