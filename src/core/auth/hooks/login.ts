import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCheckSession } from './auth';
import { SessionService } from '../session-service';
import { createAdapter } from '../../adapter';
import type { SessionCredentials } from '../session-service';

const { ValidationException, WrongCredentialsException } = SessionService;

interface ValidationErrors {
  isEmailError: boolean;
  isPasswordError: boolean;
}

interface ErrorHandlers {
  onValidationError: (errors: ValidationErrors) => void;
  onWrongCredentials: () => void;
  onUnknownError: () => void;
}

export interface LoginAPI {
  (credentials: SessionCredentials, events: ErrorHandlers): void;
}

export function useLogin(): LoginAPI {
  const checkSession = useCheckSession();
  const { mutateAsync: doLogin } = useMutation({
    mutationFn: (credentials: SessionCredentials) =>
      SessionService.create(credentials),
    onSuccess: () => {
      SessionService.rememberForOneYear();
      checkSession();
    },
  });

  return useCallback(function performLogin(credentials, events) {
    const notify = createLoginExceptionAdapter(events);
    doLogin(credentials).catch(notify);
  }, []);
}

function createLoginExceptionAdapter({
  onValidationError,
  onWrongCredentials,
  onUnknownError,
}: ErrorHandlers) {
  return createAdapter((transform) => {
    transform(ValidationException, (error) =>
      onValidationError({
        isEmailError: !error.isEmailOk(),
        isPasswordError: !error.isPasswordOk(),
      }),
    );

    transform(WrongCredentialsException, () => onWrongCredentials());

    return () => onUnknownError();
  });
}
