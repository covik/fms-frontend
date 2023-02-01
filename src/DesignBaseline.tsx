import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';

import '@fontsource/firago/300.css';
import '@fontsource/firago/400.css';
import '@fontsource/firago/500.css';
import '@fontsource/firago/700.css';

const theme = createTheme({
  typography: {
    fontFamily: 'FiraGO, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        body {
          background-color: #edeff0;
        }
      `,
    },
  },
});

export function DesignBaseline({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
