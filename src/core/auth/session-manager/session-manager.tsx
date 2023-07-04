import { useAuth } from '../auth';
import { SessionLoadingView } from '../ui/pages/session-loading-view';
import { SessionErrorView } from '../ui/pages/session-error-view';
import { LoginPage } from '../login-page';
import type { ReactNode } from 'react';

export function SessionManager({ children }: { children: ReactNode }) {
  const { user, isFetching, hasFailed, retry } = useAuth();

  if (isFetching) return <SessionLoadingView />;
  if (hasFailed) return <SessionErrorView onRetryRequest={retry} />;
  if (user === undefined) return <LoginPage />;

  return <>{children}</>;
}
