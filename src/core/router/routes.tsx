import { Navigate, Outlet, RootRoute, Route } from '@tanstack/router';
import { AuthenticatedApp } from '#foundation/authenticated-app';
import * as features from '#features';

function RootComponent() {
  return (
    <AuthenticatedApp>
      <Outlet />
    </AuthenticatedApp>
  );
}

const rootRoute = new RootRoute({ component: RootComponent });
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to={'/vehicles'} />,
});

const featureRoutes = Object.values(features)
  .map((feature) => feature.registerRoutes(rootRoute))
  .flat();

export const routeTree = rootRoute.addChildren([indexRoute, ...featureRoutes]);
