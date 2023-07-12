import { Route } from '@tanstack/router';
import { lazy } from 'react';
import type { RootRoute } from '@tanstack/router';

export function registerRoutes(rootRoute: RootRoute) {
  return [
    new Route({
      getParentRoute: () => rootRoute,
      path: '/account',
      component: lazy(() => import('./usecase/view-account-details-page')),
    }),
  ];
}
