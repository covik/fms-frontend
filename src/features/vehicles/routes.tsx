import { lazy } from 'react';
import { Route } from '@tanstack/router';
import { z } from 'zod';
import { RouteHistoryMissingDatePage } from '../../components/VehicleOverviewPage';
import { formatDateForURL } from '../../utils/date';
import type { RootRoute } from '@tanstack/router';

export function registerRoutes(rootRoute: RootRoute) {
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

  return [
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
  ];
}
