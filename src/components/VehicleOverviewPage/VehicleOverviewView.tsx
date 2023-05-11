import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export interface DetailedVehicleOverviewViewAttributes {
  title: string;
  children: ReactNode;
}

export function VehicleOverviewView({
  title,
  children,
}: DetailedVehicleOverviewViewAttributes) {
  return (
    <Box sx={{ padding: 1 }}>
      <PageTitle>{title}</PageTitle>
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
