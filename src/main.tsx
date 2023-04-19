import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  App,
  AuthProvider,
  DesignBaseline,
  AuthenticatedApp,
} from './foundation';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <DesignBaseline>
      <AuthProvider>
        <App>
          <AuthenticatedApp />
        </App>
      </AuthProvider>
    </DesignBaseline>
  </QueryClientProvider>,
);
