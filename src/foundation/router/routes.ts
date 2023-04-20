import { RootRoute, Route } from '@tanstack/router';
import { LiveTracking } from '../../components/LiveTracking';
import { VehiclesDigestPage } from '../../components/VehiclesDigestPage';

export const rootRoute = new RootRoute();

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
