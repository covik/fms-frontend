import { useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from '@tanstack/router';
import { MobileLayout, DesktopLayout } from '../Layout';
import { UpdateReadyBanner } from '../UpdateReadyBanner';

export function AppShell() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const Layout = isSmallScreen ? MobileLayout : DesktopLayout;

  return (
    <Layout>
      <UpdateReadyBanner />
      <Outlet />
    </Layout>
  );
}
