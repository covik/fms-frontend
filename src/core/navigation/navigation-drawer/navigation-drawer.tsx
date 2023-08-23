import { useCallback, useState } from 'react';
import { SwipeableDrawer, drawerClasses } from '@mui/material';
import type { ReactNode } from 'react';

export function useDrawer() {
  const [visible, toggleDrawer] = useState(false);
  const openDrawer = useCallback(() => toggleDrawer(true), []);

  return {
    visible,
    openDrawer,
    toggleDrawer,
    NavigationDrawer,
  };
}

export interface NavigationDrawerAttributes {
  visible: boolean;
  onVisibilityChange: (newVisibility: boolean) => void;
  children: ReactNode;
}

function NavigationDrawer({
  visible,
  onVisibilityChange,
  children,
}: NavigationDrawerAttributes) {
  const toggleVisibility = useCallback(
    (newVisibility: boolean) => () => onVisibilityChange(newVisibility),
    [onVisibilityChange],
  );

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={visible}
      onClose={toggleVisibility(false)}
      onOpen={toggleVisibility(true)}
      sx={{
        [`& .${drawerClasses.paper}`]: { width: '90%', maxWidth: '250px' },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
}
