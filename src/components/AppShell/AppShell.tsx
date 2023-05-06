import { Outlet } from '@tanstack/router';
import { BottomNavigationLayout } from './Layout';
import { UpdateReadyBanner } from '../UpdateReadyBanner';

export function AppShell() {
  return (
    <BottomNavigationLayout>
      <UpdateReadyBanner />
      <Outlet />
    </BottomNavigationLayout>
  );
}
