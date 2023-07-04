import { AppLayout } from '../app-layout';
import { AppUpdateNotification } from '../app-update-notification';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  return (
    <AppLayout>
      <AppUpdateNotification />
      {children}
    </AppLayout>
  );
}
