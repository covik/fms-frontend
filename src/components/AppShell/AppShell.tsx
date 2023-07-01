import { Outlet } from '@tanstack/router';
import { RouterNavigationProvider } from '#ui/molecules/navigation';
import { AppLayout } from '#ui/organisms/layout';
import { AppUpdateNotification } from '#ui/organisms/app-update-notification';

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
