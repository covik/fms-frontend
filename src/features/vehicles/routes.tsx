import { lazy } from 'react';
import { Route } from '@tanstack/router';
import { z } from 'zod';
import { MissingRouteDateRedirect } from './usecase/route-history/missing-route-date-redirect';
import { formatDateForURL } from '../../utils/date';
import type { RootRoute } from '@tanstack/router';

export function registerRoutes(rootRoute: RootRoute) {
  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: lazy(
      () => import('./usecase/live-tracking/multiple-vehicles-tracking-page'),
    ),
  });

  const vehiclesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'vehicles',
  });

  const vehiclesIndexRoute = new Route({
    getParentRoute: () => vehiclesRoute,
    path: '/',
    component: lazy(
      () => import('./usecase/browse-vehicles/browse-vehicles-page'),
    ),
  });

  const vehicleRoute = new Route({
    getParentRoute: () => vehiclesRoute,
    path: '$vehicleId',
    component: lazy(
      () => import('./usecase/manage-vehicle/manage-vehicle-root-page'),
    ),
  });

  const vehicleLivePreviewRoute = new Route({
    getParentRoute: () => vehicleRoute,
    path: '/',
    component: lazy(
      () => import('./usecase/live-tracking/single-vehicle-tracking-page'),
    ),
  });

  const vehicleTodayRoute = new Route({
    getParentRoute: () => vehicleRoute,
    path: '/today',
    component: lazy(() => import('./usecase/route-history/today-route-page')),
  });

  const vehicleRouteHistoryRoute = new Route({
    getParentRoute: () => vehicleRoute,
    path: 'history',
  });

  const vehicleRouteHistoryRedirectRoute = new Route({
    getParentRoute: () => vehicleRouteHistoryRoute,
    path: '/',
    component: MissingRouteDateRedirect,
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
    component: lazy(() => import('./usecase/route-history/past-route-page')),
  });

  const mileageReportRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/reports/mileage',
    component: lazy(
      () => import('./usecase/mileage-report/mileage-report-page'),
    ),
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
    mileageReportRoute,
  ];
}
