import { router, RouterProvider } from '#core/router';

export function AuthenticatedApp() {
  return <RouterProvider router={router} />;
}
