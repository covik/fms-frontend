import { Box, CircularProgress } from '@mui/material';
import {
  LoginPage,
  testingSelectors as loginSelectors,
} from '../components/LoginPage';
import { useAuth } from './';
import type { ReactNode } from 'react';

export function App({ children }: { children: ReactNode }) {
  const { isFetching, isAuthenticated, finishLogin } = useAuth();

  if (isFetching) return <FullPageSpinner />;

  if (isAuthenticated) return <>{children}</>;

  return <LoginPage onSuccessfulAttempt={finishLogin} />;
}

export const testingSelectors = {
  spinner: 'page-spinner',
  login: {
    page: loginSelectors.container,
    email: loginSelectors.inputs.email,
    password: loginSelectors.inputs.password,
    form: loginSelectors.form,
  },
};

function FullPageSpinner() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        size="4rem"
        thickness={5}
        data-testid={testingSelectors.spinner}
      />
    </Box>
  );
}
