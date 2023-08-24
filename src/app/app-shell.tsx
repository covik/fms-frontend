import { AppUpdateNotification } from './update';
import { AppBar } from './bar';
import { useDrawer, AppDrawer } from './drawer';
import { AppNavigation } from './navigation';
import type { ReactNode } from 'react';
import { HyperlinkRendererProvider } from './navigation/navigation-renderer';

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
        <HyperlinkRendererProvider>
          <AppNavigation />
        </HyperlinkRendererProvider>
      </AppDrawer>

      {children}
    </>
  );
}
