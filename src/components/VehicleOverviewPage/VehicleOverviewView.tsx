import { Box } from '@mui/material';
import { PageTitle } from '../PageTitle';
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
