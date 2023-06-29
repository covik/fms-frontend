import { Box } from '@mui/material';
import { FixedPage, PageTitle } from '../Page';
import type { ReactNode } from 'react';

export interface VehicleOverviewViewAttributes {
  title: string;
  children: ReactNode;
}

export function VehicleOverviewView({
  title,
  children,
}: VehicleOverviewViewAttributes) {
  return (
    <FixedPage>
      <Box
        padding={1}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
      >
        <PageTitle>{title}</PageTitle>
        {children}
      </Box>
    </FixedPage>
  );
}
