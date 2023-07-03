import { Outlet, RootRoute } from '@tanstack/router';
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

const featureModules = Object.values(features);
const featureRoutes = featureModules.map((feature) =>
  feature.registerRoutes(rootRoute),
);
const flatFeatureRoutes = featureRoutes.flat();

export const routeTree = rootRoute.addChildren(flatFeatureRoutes);
