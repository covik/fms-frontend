import { BottomNavigationLayout } from '../../components/AppShell';
import { router, RouterProvider } from '../router';

export function AuthenticatedApp() {
  return (
    <BottomNavigationLayout>
      <RouterProvider router={router} />
    </BottomNavigationLayout>
  );
}
