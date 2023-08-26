import { AuthenticatedApp } from '../authenticated-app';
import { Outlet, RootRoute, Route } from '#core/router';

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
  component: () => <div>Ahhhhh, fresh start</div>,
});

export const routeTree = root.addChildren([index]);
