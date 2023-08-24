import { createMemoryHistory, RootRoute, Route } from '@tanstack/router';
import { BaseRouter, Router } from './router';
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
  const root = new RootRoute();
  const index = new Route({
    getParentRoute: () => root,
    path: '/',
    component: children ? () => <>{children}</> : component,
  });

  const router = new Router({
    routeTree: root.addChildren([index]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  return <BaseRouter router={router} />;
}
