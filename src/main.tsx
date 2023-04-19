import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  App,
  AuthProvider,
  DesignBaseline,
  AuthenticatedApp,
} from './foundation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DesignBaseline>
    <AuthProvider>
      <App>
        <AuthenticatedApp />
      </App>
    </AuthProvider>
  </DesignBaseline>,
);
