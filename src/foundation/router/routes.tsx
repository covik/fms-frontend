import { lazy } from 'react';
import { RootRoute, Route } from '@tanstack/router';
import { AppShell } from '../../components/AppShell';

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
  path: '/vehicles',
  component: lazy(() => import('../../pages/VehiclesDigestPage')),
});

export const routeTree = rootRoute.addChildren([indexRoute, vehiclesRoute]);
