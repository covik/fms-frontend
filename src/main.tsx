import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppUpdateManager } from '#app/update';
import { DesignBaseline } from '#app/design-baseline';
import { ProductionRouter } from '#app/router';
import { SessionManager } from '#app/session';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppUpdateManager>
    <QueryClientProvider client={queryClient}>
      <DesignBaseline>
        <SessionManager>
          <ProductionRouter />
        </SessionManager>
      </DesignBaseline>
    </QueryClientProvider>
  </AppUpdateManager>,
);
