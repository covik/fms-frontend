import { AppUpdateNotification } from './update';
import { AppBar } from './bar';
import { useDrawer, AppDrawer } from './drawer';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  const { visible, openDrawer, toggleDrawer } = useDrawer();

  return (
    <>
      <AppUpdateNotification />

      <AppBar onHamburgerClick={openDrawer} />

      <AppDrawer visible={visible} onVisibilityChange={toggleDrawer}>
        test
      </AppDrawer>
      {children}
    </>
  );
}
