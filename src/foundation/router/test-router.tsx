import {
  createMemoryHistory,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/router';
import { defaultPendingComponent } from './router';
import type { ReactNode } from 'react';
import type { RouteComponent } from '@tanstack/router';

export interface TestRouterProviderAttributes {
  children?: ReactNode;
  component?: RouteComponent;
}

export function TestRouterProvider({
  children,
  component,
}: TestRouterProviderAttributes) {
  const rootRoute = new RootRoute();
  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: children ? () => <>{children}</> : component,
  });
  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = new Router({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
    defaultPendingComponent,
  });
  return <RouterProvider router={router} />;
}
