import { useState } from 'react';
import { useLogin } from '#core/auth';
import { LoginView } from '../login-view';
import type { LoginViewAttributes } from '../login-view';

export { testingSelectors } from '../login-view';

export function LoginPage() {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useLogin();

  function tryLogin(email: string, password: string) {
    goTo('submitting');
    login(
      { email, password },
      {
        onValidationError({ isEmailError, isPasswordError }) {
          goTo('validation-error');
          if (isEmailError) setEmailError('Email je obavezan');
          if (isPasswordError) setPasswordError('Lozinka je obavezna');
        },
        onWrongCredentials() {
          goTo('wrong-credentials');
        },
        onUnknownError() {
          goTo('unexpected-error');
        },
      },
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
