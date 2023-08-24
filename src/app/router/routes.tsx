import { AuthenticatedApp } from '../authenticated-app';
import { Navigate, Outlet, RootRoute, Route } from '#core/router';
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
  component: () => <Navigate to={'/vehicles'} replace />,
});
const features = Object.values(featureModules)
  .map((feature) => feature.registerRoutes(root))
  .flat();

export const routeTree = root.addChildren([index, ...features]);
