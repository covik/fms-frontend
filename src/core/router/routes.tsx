import { Navigate, Outlet, RootRoute, Route } from '@tanstack/router';
import { AuthenticatedApp } from '#app/authenticated-app';
import * as featureModules from '#features';

function App() {
  return (
    <AuthenticatedApp>
      <Outlet />
    </AuthenticatedApp>
  );
}

const root = new RootRoute({ component: App });
const index = new Route({
  getParentRoute: () => root,
  path: '/',
  component: () => <Navigate to={'/vehicles'} />,
});
const features = Object.values(featureModules)
  .map((feature) => feature.registerRoutes(root))
  .flat();

export const routeTree = root.addChildren([index, ...features]);
