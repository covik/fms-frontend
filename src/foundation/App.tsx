import {
  LoginPage,
  testingSelectors as loginSelectors,
} from '../components/LoginPage';
import {
  container,
  loadingIndicator,
  retryButton,
  SessionErrorView,
  SessionLoadingView,
  useAuth,
} from '#core/auth';
import type { ReactNode } from 'react';

export function App({ children }: { children: ReactNode }) {
  const { user, isFetching, hasFailed, finishLogin, retry } = useAuth();

  if (isFetching) return <SessionLoadingView />;
  if (hasFailed) return <SessionErrorView onRetryRequest={retry} />;
  if (user === undefined)
    return <LoginPage onSuccessfulAttempt={finishLogin} />;

  return <>{children}</>;
}

export const testingSelectors = {
  spinner: loadingIndicator,
  login: {
    page: loginSelectors.container,
    email: loginSelectors.inputs.email,
    password: loginSelectors.inputs.password,
    form: loginSelectors.form,
  },
  failure: {
    container: container,
    retry: retryButton,
  },
};
