import { Drawer, drawerClasses } from '@mui/material';
import type { ReactNode } from 'react';

export interface NavigationDrawerAttributes {
  visible: boolean;
  onHide: () => void;
  children: ReactNode;
}

export function NavigationDrawer({
  visible,
  onHide,
  children,
}: NavigationDrawerAttributes) {
  return (
    <Drawer
      anchor={'left'}
      open={visible}
      onClose={onHide}
      sx={{
        [`& .${drawerClasses.paper}`]: { width: '90%', maxWidth: '250px' },
      }}
    >
      {children}
    </Drawer>
  );
}
