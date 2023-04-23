import { router, RouterProvider } from '../router';

export function AuthenticatedApp() {
  return <RouterProvider router={router} />;
}
