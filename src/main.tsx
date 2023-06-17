import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  App,
  AuthProvider,
  DesignBaseline,
  AppVersionProvider,
  DateTimeProvider,
} from './foundation';
import { AuthenticatedApp } from './foundation/AuthenticatedApp';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppVersionProvider>
    <QueryClientProvider client={queryClient}>
      <DateTimeProvider>
        <DesignBaseline>
          <AuthProvider>
            <App>
              <AuthenticatedApp />
            </App>
          </AuthProvider>
        </DesignBaseline>
      </DateTimeProvider>
    </QueryClientProvider>
  </AppVersionProvider>,
);
