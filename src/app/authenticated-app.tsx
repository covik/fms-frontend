import { DateTimeProvider } from '#core/time';
import { AppUpdateNotification } from './update';
import type { ReactNode } from 'react';

export interface AuthenticatedAppAttributes {
  children: ReactNode;
}

export function AuthenticatedApp({ children }: AuthenticatedAppAttributes) {
  return (
    <>
      <AppUpdateNotification />
      <DateTimeProvider>{children}</DateTimeProvider>
    </>
  );
}
