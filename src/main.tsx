import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App, DesignBaseline } from './foundation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DesignBaseline>
      <App />
    </DesignBaseline>
  </React.StrictMode>,
);
