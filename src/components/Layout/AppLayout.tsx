import { useMediaQuery, useTheme } from '@mui/material';
import { MobileLayout } from './MobileLayout';
import { DesktopLayout } from './DesktopLayout';
import type { ReactNode } from 'react';

interface AppLayoutAttributes {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutAttributes) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const Layout = isSmallScreen ? MobileLayout : DesktopLayout;

  return <Layout>{children}</Layout>;
}
