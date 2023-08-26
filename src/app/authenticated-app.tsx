import { DateTimeProvider } from '#core/time';
import { RouterNavigationProvider } from '#ui/molecules/navigation';
import { AppUpdateNotification } from './update';
import type { ReactNode } from 'react';

export interface AuthenticatedAppAttributes {
  children: ReactNode;
}

export function AuthenticatedApp({ children }: AuthenticatedAppAttributes) {
  return (
    <>
      <AppUpdateNotification />
      <DateTimeProvider>
        <RouterNavigationProvider>{children}</RouterNavigationProvider>
      </DateTimeProvider>
    </>
  );
}
