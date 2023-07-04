import { useState } from 'react';
import { useLogin } from '../../hooks/login';
import { LoginView } from '../../ui/pages/login-view';
import type {
  OnValidationError,
  OnWrongCredentials,
  OnUnknownError,
} from '../../hooks/login';
import type { LoginViewAttributes } from '../../ui/pages/login-view';

export { testingSelectors } from '../../ui/pages/login-view';

export function LoginPage() {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useLogin();

  const handleValidationErrors: OnValidationError = ({
    isEmailError,
    isPasswordError,
  }) => {
    goTo('validation-error');
    if (isEmailError) setEmailError('Email je obavezan');
    if (isPasswordError) setPasswordError('Lozinka je obavezna');
  };

  const handleWrongCredentials: OnWrongCredentials = () => {
    goTo('wrong-credentials');
  };

  const handleUnexpectedError: OnUnknownError = () => {
    goTo('unexpected-error');
  };

  function tryLogin(email: string, password: string) {
    goTo('submitting');

    login(
      { email, password },
      handleValidationErrors,
      handleWrongCredentials,
      handleUnexpectedError,
    );
  }

  return (
    <LoginView
      state={currentState}
      emailError={emailError}
      passwordError={passwordError}
      onLoginAttempt={tryLogin}
    />
  );
}
