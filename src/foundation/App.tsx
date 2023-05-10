import { Box, CircularProgress } from '@mui/material';
import {
  LoginPage,
  testingSelectors as loginSelectors,
} from '../components/LoginPage';
import {
  SessionFailureView,
  testingSelectors as failureSelectors,
} from '../components/SessionFailureView';
import { useAuth } from './context/Auth';
import type { ReactNode } from 'react';

export function App({ children }: { children: ReactNode }) {
  const { user, hasToSubmitCredentials, hasFailed, finishLogin, retry } =
    useAuth();

  if (hasToSubmitCredentials)
    return <LoginPage onSuccessfulAttempt={finishLogin} />;

  if (hasFailed) return <SessionFailureView onRetryRequest={retry} />;

  if (user === undefined) return <FullPageSpinner />;

  return <>{children}</>;
}

export const testingSelectors = {
  spinner: 'page-spinner',
  login: {
    page: loginSelectors.container,
    email: loginSelectors.inputs.email,
    password: loginSelectors.inputs.password,
    form: loginSelectors.form,
  },
  failure: failureSelectors,
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
