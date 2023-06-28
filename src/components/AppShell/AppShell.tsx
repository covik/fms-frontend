import { Outlet } from '@tanstack/router';
import { AppLayout } from '../Layout';
import { AppUpdateReadyBanner } from '../AppUpdateReadyBanner';
import { RouterNavigationProvider } from '#ui/molecules';

export function AppShell() {
  return (
    <RouterNavigationProvider>
      <AppLayout>
        <AppUpdateReadyBanner />
        <Outlet />
      </AppLayout>
    </RouterNavigationProvider>
  );
}
