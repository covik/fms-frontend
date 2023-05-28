import { Box, Drawer } from '@mui/material';
import { Navigation } from '../Navigation';
import { Logo } from '../../Logo';
import type { ReactNode } from 'react';

export interface DesktopLayoutAttributes {
  children: ReactNode;
}

const drawerWidth = 70;
const logoSize = 38;

export function DesktopLayout({ children }: DesktopLayoutAttributes) {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          marginLeft: `${drawerWidth}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
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
          <Navigation vertical />
        </Box>
      </Drawer>
    </>
  );
}
