import { Outlet, RootRoute, Route } from '@tanstack/router';
import { LiveTracking } from '../../components/LiveTracking';
import { VehiclesDigestPage } from '../../components/VehiclesDigestPage';
import { BottomNavigationLayout } from '../../components/AppShell';

export const rootRoute = new RootRoute({
  component: () => {
    return (
      <BottomNavigationLayout>
        <Outlet />
      </BottomNavigationLayout>
    );
  },
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LiveTracking,
});

export const vehiclesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vehicles',
  component: VehiclesDigestPage,
});
