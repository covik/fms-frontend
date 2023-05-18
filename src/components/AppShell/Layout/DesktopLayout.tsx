import { Box, Drawer } from '@mui/material';
import { Navigation } from '../Navigation';
import logo from '../../../assets/logo.svg';
import type { ReactNode } from 'react';

export interface DesktopLayoutAttributes {
  children: ReactNode;
}

const drawerWidth = 90;
const logoSize = 35;

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
          <img src={logo} alt={'Logo'} width={logoSize} />
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <Navigation vertical />
        </Box>
      </Drawer>
    </>
  );
}
