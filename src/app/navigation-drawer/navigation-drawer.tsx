import { useCallback } from 'react';
import { SwipeableDrawer, drawerClasses } from '@mui/material';
import type { ReactNode } from 'react';

export interface AppNavigationDrawerAttributes {
  visible: boolean;
  onVisibilityChange: (newVisibility: boolean) => void;
  children: ReactNode;
}

export function AppNavigationDrawer({
  visible,
  onVisibilityChange,
  children,
}: AppNavigationDrawerAttributes) {
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
