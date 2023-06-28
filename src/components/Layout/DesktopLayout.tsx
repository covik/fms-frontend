import { Box, Drawer } from '@mui/material';
import { Logo } from '#ui/atoms';
import { AppNavigation, DESKTOP_ITEMS } from '#ui/molecules';
import { LayoutProvider } from './Layout';
import type { ReactNode } from 'react';

export interface DesktopLayoutAttributes {
  children: ReactNode;
}

const drawerWidth = '70px';
const logoSize = 38;

export function DesktopLayout({ children }: DesktopLayoutAttributes) {
  return (
    <>
      <LayoutProvider offsetLeft={drawerWidth}>{children}</LayoutProvider>
      <Drawer
        sx={{
          'width': drawerWidth,
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
            marginBottom: 1,
          }}
        >
          <Logo size={logoSize} />
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <AppNavigation vertical items={DESKTOP_ITEMS} />
        </Box>
      </Drawer>
    </>
  );
}
