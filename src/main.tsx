import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppVersionProvider } from '#core/version';
import { App } from './foundation';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppVersionProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppVersionProvider>,
);
