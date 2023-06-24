import { Paper, useTheme } from '@mui/material';
import { LayoutProvider } from './Layout';
import { AppNavigation, MOBILE_ITEMS } from '../AppNavigation';
import { RouterNavigationProvider } from '../Navigation';
import type { ReactNode } from 'react';

export interface MobileLayoutAttributes {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutAttributes) {
  const theme = useTheme();
  const navigationHeight = theme.spacing(9);

  return (
    <>
      <LayoutProvider offsetBottom={navigationHeight}>
        {children}
      </LayoutProvider>
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
        <RouterNavigationProvider items={MOBILE_ITEMS}>
          <AppNavigation />
        </RouterNavigationProvider>
      </Paper>
    </>
  );
}
