import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';
import { Navigation } from '../Navigation';

export interface BottomNavigationAttributes {
  children: ReactNode;
}

export function BottomNavigationLayout({
  children,
}: BottomNavigationAttributes) {
  const navigationHeight = 9;

  return (
    <>
      <Box sx={{ paddingBottom: navigationHeight }}>{children}</Box>
      <Paper
        square
        variant="elevation"
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Navigation />
      </Paper>
    </>
  );
}
