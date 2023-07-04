import { useMutation } from '@tanstack/react-query';
import { useCheckSession } from './auth';
import { SessionService } from '../services';
import type { SessionCredentials } from '../services';

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
    mutationFn: (credentials: SessionCredentials) =>
      SessionService.create(credentials),
    onSuccess: () => {
      SessionService.rememberForOneYear();
      checkSession();
    },
  });

  return function performLogin(
    credentials,
    onValidationError,
    onWrongCredentials,
    onUnknownError,
  ): void {
    login.mutate(credentials, {
      onError: (error) => {
        if (error instanceof SessionService.ValidationException) {
          onValidationError({
            isEmailError: !error.isEmailOk(),
            isPasswordError: !error.isPasswordOk(),
          });
        } else if (error instanceof SessionService.WrongCredentialsException) {
          onWrongCredentials();
        } else {
          onUnknownError();
        }
      },
    });
  };
}
