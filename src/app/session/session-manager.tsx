import { useAuth } from '#core/auth';
import { SessionLoadingView } from './session-loading-view';
import { SessionErrorView } from './session-error-view';
import { LoginPage } from './login-page';
import type { ReactNode } from 'react';

export function SessionManager({ children }: { children: ReactNode }) {
  const { user, isFetching, hasFailed, retry } = useAuth();

  if (isFetching) return <SessionLoadingView />;
  if (hasFailed) return <SessionErrorView onRetryRequest={retry} />;
  if (user === undefined) return <LoginPage />;

  return <>{children}</>;
}
