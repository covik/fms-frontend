import { Box, CircularProgress, Typography } from '@mui/material';
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
