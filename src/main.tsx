import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { App, DesignBaseline } from './foundation';
import { AuthenticatedApp } from './foundation/AuthenticatedApp';
import { AuthProvider } from '#core/auth';
import { DateTimeProvider } from '#core/time';
import { AppVersionProvider } from '#core/version';

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
