import { createContext, useCallback, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Session } from '../../lib/SessionService';
import { BaseUser } from '../../models/User';
import {
  preventAutomaticRefetch,
  preventAutomaticRetry,
} from '../../utils/tanstack-query';
import type { ReactNode } from 'react';

export interface AuthAPI {
  user: BaseUser | undefined;
  isFetching: boolean;
  hasFailed: boolean;
  retry: () => void;
  finishLogin: () => void;
  finishLogout: () => void;
}

const AuthContext = createContext<AuthAPI | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: ({ signal }) => Session.obtain(signal),
    ...preventAutomaticRetry,
    ...preventAutomaticRefetch,
    ...fetchIfOffline(),
  });

  const user = query.status === 'success' ? query.data : undefined;
  const isFetching = query.isFetching;
  const hasFailed =
    !!query.error &&
    !(query.error instanceof Session.UserNotAuthenticatedException);
  const retry = useCallback(() => void query.refetch(), [query]);

  const api = useMemo(
    () => ({
      user,
      isFetching,
      hasFailed,
      retry,
      finishLogin: retry,
      finishLogout: retry,
    }),
    [user, hasFailed, isFetching, retry],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthAPI {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      'AuthContext should not return undefined. Forgot to call AuthProvider?',
    );

  return context;
}

export function useUser(): BaseUser {
  const { user } = useAuth();

  if (user === undefined)
    throw new Error(
      'User is not logged in,' +
        'a bug exists in authentication logic,' +
        'or you used useUser() in unauthenticated part of the application.',
    );

  return user;
}

function fetchIfOffline() {
  return {
    networkMode: 'always',
  } satisfies Record<string, 'always'>;
}
