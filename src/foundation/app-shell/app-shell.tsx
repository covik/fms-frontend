import { AppUpdateNotification } from '../app-update';
import { PrimaryNavigation } from '#core/navigation';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  return (
    <>
      <PrimaryNavigation />
      <AppUpdateNotification />
      {children}
    </>
  );
}
