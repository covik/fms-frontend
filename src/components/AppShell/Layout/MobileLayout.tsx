import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';
import { Navigation } from '../Navigation';

export interface MobileLayoutAttributes {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutAttributes) {
  const navigationHeight = 9;

  return (
    <>
      <Box
        sx={(theme) => ({
          height: `calc(100vh - ${theme.spacing(navigationHeight)})`,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {children}
      </Box>
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
