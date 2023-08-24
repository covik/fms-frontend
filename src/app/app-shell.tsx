import { AppUpdateNotification } from './update';
import { AppBar } from './bar';
import { useDrawer, AppNavigationDrawer } from './navigation-drawer';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  const { visible, openDrawer, toggleDrawer } = useDrawer();
  return (
    <>
      <AppBar onHamburgerClick={openDrawer} />
      <AppUpdateNotification />
      <AppNavigationDrawer visible={visible} onVisibilityChange={toggleDrawer}>
        test
      </AppNavigationDrawer>
      {children}
    </>
  );
}
