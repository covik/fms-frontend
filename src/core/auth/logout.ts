import { useMutation } from '@tanstack/react-query';
import { useCheckSession } from './auth';
import { SessionService } from './services';

export interface LogoutAPI {
  perform: () => void;
  inProgress: boolean;
}

export function useLogout(): LogoutAPI {
  const checkSession = useCheckSession();
  const logoutRequest = useMutation({
    mutationFn: () => SessionService.destroy(),
    onSuccess: checkSession,
  });

  return {
    perform: () => void logoutRequest.mutate(),
    inProgress: logoutRequest.status === 'loading',
  };
}
