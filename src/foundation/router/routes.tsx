import { lazy } from 'react';
import { RootRoute, Route } from '@tanstack/router';
import { AppShell } from '../../components/AppShell';
import { AccountPage } from '../../components/AccountPage';

const rootRoute = new RootRoute({
  component: AppShell,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazy(() => import('../../pages/LiveTrackingPage')),
});

const vehiclesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'vehicles',
});

const vehiclesIndexRoute = new Route({
  getParentRoute: () => vehiclesRoute,
  path: '/',
  component: lazy(() => import('../../pages/VehiclesDigestPage')),
});

const vehicleRoute = new Route({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  component: lazy(() => import('../../pages/VehicleOverviewPage')),
});

const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: AccountPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  vehiclesRoute.addChildren([vehiclesIndexRoute, vehicleRoute]),
  accountRoute,
]);
