import { Box, Typography } from '@mui/material';
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
    <Box padding={1} flex={1} display={'flex'} flexDirection={'column'}>
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
      textAlign={'left'}
    >
      {children}
    </Typography>
  );
}
