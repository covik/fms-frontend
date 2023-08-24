import { AppUpdateNotification } from './update';
import type { ReactNode } from 'react';

export interface AppShellAttributes {
  children: ReactNode;
}

export function AppShell({ children }: AppShellAttributes) {
  return (
    <>
      <AppUpdateNotification />
      {children}
    </>
  );
}
