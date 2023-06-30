import { Outlet } from '@tanstack/router';
import { AppLayout } from '../Layout';
import { RouterNavigationProvider } from '#ui/molecules';
import { AppUpdateNotification } from '#ui/organisms';

export function AppShell() {
  return (
    <RouterNavigationProvider>
      <AppLayout>
        <AppUpdateNotification />
        <Outlet />
      </AppLayout>
    </RouterNavigationProvider>
  );
}
