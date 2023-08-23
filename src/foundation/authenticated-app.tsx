import { DateTimeProvider } from '#core/time';
import { RouterNavigationProvider } from '#ui/molecules/navigation';
import { AppShell } from './app-shell';
import type { ReactNode } from 'react';

export interface AuthenticatedAppAttributes {
  children: ReactNode;
}

export function AuthenticatedApp({ children }: AuthenticatedAppAttributes) {
  return (
    <DateTimeProvider>
      <RouterNavigationProvider>
        <AppShell>{children}</AppShell>
      </RouterNavigationProvider>
    </DateTimeProvider>
  );
}
