import { Box, CircularProgress, Typography } from '@mui/material';
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

export function VehicleLoadingIndicator() {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box>
        <CircularProgress size={50} thickness={5} variant={'indeterminate'} />
      </Box>
      <Typography component={'div'} variant={'body2'} marginTop={1}>
        Učitavanje vozila
      </Typography>
    </Box>
  );
}
