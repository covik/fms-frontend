import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { DesignBaseline } from './DesignBaseline';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DesignBaseline>
      <App />
    </DesignBaseline>
  </React.StrictMode>,
);
