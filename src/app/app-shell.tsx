import { AppBar } from './bar';
import { useDrawer, AppDrawer } from './drawer';
import { AppNavigation, HyperlinkRendererProvider } from './navigation';
import { AppUpdateNotification } from './update';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  const { visible, openDrawer, toggleDrawer } = useDrawer();

  return (
    <>
      <AppBar onHamburgerClick={openDrawer} />

      <AppDrawer visible={visible} onVisibilityChange={toggleDrawer}>
        <HyperlinkRendererProvider>
          <AppNavigation />
        </HyperlinkRendererProvider>
      </AppDrawer>

      <AppUpdateNotification />

      {children}
    </>
  );
}
