import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionManager } from '#core/auth';
import { router, RouterProvider } from '#core/router';
import { AppUpdateManager } from '#foundation/app-update';
import { DesignBaseline } from '#foundation/design-baseline';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppUpdateManager>
    <QueryClientProvider client={queryClient}>
      <DesignBaseline>
        <SessionManager>
          <RouterProvider router={router} />
        </SessionManager>
      </DesignBaseline>
    </QueryClientProvider>
  </AppUpdateManager>,
);
