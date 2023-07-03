import { AuthProvider, SessionManager } from '#core/auth';
import { router, RouterProvider } from '#core/router';
import { DesignBaseline } from './design-baseline';

export function App() {
  return (
    <DesignBaseline>
      <AuthProvider>
        <SessionManager>
          <RouterProvider router={router} />
        </SessionManager>
      </AuthProvider>
    </DesignBaseline>
  );
}
