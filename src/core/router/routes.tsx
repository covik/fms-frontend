import { lazy } from 'react';
import { Outlet, RootRoute, Route } from '@tanstack/router';
import { AuthenticatedApp } from '../../foundation/authenticated-app';
import { RouteHistoryMissingDatePage } from '../../components/VehicleOverviewPage';
import { z } from 'zod';
import { formatDateForURL } from '../../utils/date';

function RootComponent() {
  return (
    <AuthenticatedApp>
      <Outlet />
    </AuthenticatedApp>
  );
}

const rootRoute = new RootRoute({
  component: RootComponent,
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

const vehicleLivePreviewRoute = new Route({
  getParentRoute: () => vehicleRoute,
  path: '/',
  component: lazy(() => import('../../pages/VehicleLivePreviewPage')),
});

const vehicleTodayRoute = new Route({
  getParentRoute: () => vehicleRoute,
  path: '/today',
  component: lazy(() => import('../../pages/VehicleTodayRoutePage')),
});

const vehicleRouteHistoryRoute = new Route({
  getParentRoute: () => vehicleRoute,
  path: 'history',
});

const vehicleRouteHistoryRedirectRoute = new Route({
  getParentRoute: () => vehicleRouteHistoryRoute,
  path: '/',
  component: RouteHistoryMissingDatePage,
});

const vehicleRouteHistoryViewerRoute = new Route({
  getParentRoute: () => vehicleRouteHistoryRoute,
  path: '$date',
  parseParams: (params) => ({
    date: z.coerce.date().parse(params.date),
  }),
  stringifyParams: ({ date }) => ({
    date: formatDateForURL(date),
  }),
  component: lazy(() => import('../../pages/VehicleRouteHistoryPage')),
});

const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: lazy(() => import('../../pages/AccountPage')),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  vehiclesRoute.addChildren([
    vehiclesIndexRoute,
    vehicleRoute.addChildren([
      vehicleLivePreviewRoute,
      vehicleTodayRoute,
      vehicleRouteHistoryRoute.addChildren([
        vehicleRouteHistoryRedirectRoute,
        vehicleRouteHistoryViewerRoute,
      ]),
    ]),
  ]),
  accountRoute,
]);
