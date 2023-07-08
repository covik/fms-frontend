import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SessionService } from '../services';
import { BaseUser } from '../../../models/user';
import { fetchIfOffline } from '../../../utils/tanstack-query';

export interface AuthAPI {
  user: BaseUser | undefined;
  isFetching: boolean;
  hasFailed: boolean;
  retry: () => void;
}

export const retryCount = 3;

const queryKey = ['current-user'];

export function useAuth(): AuthAPI {
  const query = useQuery({
    queryKey,
    queryFn: ({ signal }) => SessionService.obtain(signal),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...fetchIfOffline,
    retry: (failureCount, error) => {
      if (error instanceof SessionService.UserNotAuthenticatedException)
        return false;
      return failureCount < retryCount;
    },
  });

  const user = query.status === 'success' ? query.data : undefined;
  const isFetching = query.isFetching;
  const hasFailed =
    !!query.error &&
    !(query.error instanceof SessionService.UserNotAuthenticatedException);
  const retry = () => void query.refetch();

  return {
    user,
    isFetching,
    hasFailed,
    retry,
  };
}

export function useUser(): BaseUser {
  const { user } = useAuth();

  if (user === undefined) throw new Error('User is not logged in');

  return user;
}

export function useCheckSession(): () => void {
  const client = useQueryClient();
  return () => void client.invalidateQueries({ queryKey });
}
