import { useMutation } from '@tanstack/react-query';
import { useCheckSession } from './auth';
import { SessionService } from '../services';
import { createAdapter } from '../../adapter';
import type { SessionCredentials } from '../services';

const {
  create: createSession,
  rememberForOneYear,
  ValidationException,
  WrongCredentialsException,
} = SessionService;

export interface ValidationErrors {
  isEmailError: boolean;
  isPasswordError: boolean;
}

export interface OnValidationError {
  (errors: ValidationErrors): void;
}

export interface OnWrongCredentials {
  (): void;
}

export interface OnUnknownError {
  (): void;
}

export interface LoginAPI {
  (
    credentials: SessionCredentials,
    onValidationError: OnValidationError,
    onWrongCredentials: OnWrongCredentials,
    onUnknownError: OnUnknownError,
  ): void;
}

export function useLogin(): LoginAPI {
  const checkSession = useCheckSession();
  const login = useMutation({
    mutationFn: (credentials: SessionCredentials) => createSession(credentials),
    onSuccess: () => {
      rememberForOneYear();
      checkSession();
    },
  });

  return function performLogin(
    credentials,
    onValidationError,
    onWrongCredentials,
    onUnknownError,
  ): void {
    const adaptException = createAdapter((transform) => {
      transform(ValidationException, (error) =>
        onValidationError({
          isEmailError: !error.isEmailOk(),
          isPasswordError: !error.isPasswordOk(),
        }),
      );

      transform(WrongCredentialsException, () => onWrongCredentials());

      return onUnknownError;
    });

    login.mutate(credentials, {
      onError: (exception) => adaptException(exception),
    });
  };
}
