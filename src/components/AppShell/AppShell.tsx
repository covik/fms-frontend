import { AppLayout } from '#ui/organisms/layout';
import { AppUpdateNotification } from '#ui/organisms/app-update-notification';
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
