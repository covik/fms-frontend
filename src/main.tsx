import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App, AuthProvider, DesignBaseline } from './foundation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DesignBaseline>
      <AuthProvider>
        <App>
          <div>Hey!</div>
        </App>
      </AuthProvider>
    </DesignBaseline>
  </React.StrictMode>,
);
