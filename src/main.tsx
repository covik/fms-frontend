import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  AppUpdateManager,
  DesignBaseline,
  SessionManager,
  ProductionRouter,
} from '#app';

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
