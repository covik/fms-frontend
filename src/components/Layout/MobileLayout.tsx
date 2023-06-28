import { Paper, useTheme } from '@mui/material';
import { AppNavigation, MOBILE_ITEMS } from '#ui/molecules';
import { LayoutProvider } from './Layout';
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
        <AppNavigation items={MOBILE_ITEMS} />
      </Paper>
    </>
  );
}
