import { Outlet } from '@tanstack/router';
import { AppLayout } from '../Layout';
import { AppUpdateReadyBanner } from '../AppUpdateReadyBanner';

export function AppShell() {
  return (
    <AppLayout>
      <AppUpdateReadyBanner />
      <Outlet />
    </AppLayout>
  );
}
