import { lazy } from 'react';
import { Outlet, RootRoute, Route } from '@tanstack/router';
import { BottomNavigationLayout } from '../../components/AppShell';

const rootRoute = new RootRoute({
  component: () => {
    return (
      <BottomNavigationLayout>
        <Outlet />
      </BottomNavigationLayout>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazy(() => import('../../pages/LiveTrackingPage')),
});

const vehiclesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vehicles',
  component: lazy(() => import('../../pages/VehiclesDigestPage')),
});

export const routeTree = rootRoute.addChildren([indexRoute, vehiclesRoute]);
