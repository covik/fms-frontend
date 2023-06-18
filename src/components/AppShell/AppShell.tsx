import { Outlet } from '@tanstack/router';
import { AppLayout } from '../Layout';
import { UpdateReadyBanner } from '../UpdateReadyBanner';

export function AppShell() {
  return (
    <AppLayout>
      <UpdateReadyBanner />
      <Outlet />
    </AppLayout>
  );
}
