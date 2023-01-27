import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { App } from './App';
import '@fontsource/firago/300.css';
import '@fontsource/firago/400.css';
import '@fontsource/firago/500.css';
import '@fontsource/firago/700.css';

const theme = createTheme({
  typography: {
    fontFamily: 'FiraGO, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
