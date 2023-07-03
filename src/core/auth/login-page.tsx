import { useState } from 'react';
import { LoginView } from './ui/pages/login-view';
import { Session } from '#lib/SessionService';
import type { LoginViewAttributes } from './ui/pages/login-view';

export { testingSelectors } from './ui/pages/login-view';

export interface LoginPageAttributes {
  onSuccessfulAttempt: () => unknown;
}

export function LoginPage({ onSuccessfulAttempt }: LoginPageAttributes) {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function tryLogin(email: string, password: string) {
    goTo('submitting');

    try {
      await Session.create({ email, password });
      Session.rememberForOneYear();
      onSuccessfulAttempt();
    } catch (e) {
      if (e instanceof Session.ValidationException) {
        goTo('validation-error');
        !e.isEmailOk() && setEmailError('Email je obavezan');
        !e.isPasswordOk() && setPasswordError('Lozinka je obavezna');
      } else if (e instanceof Session.WrongCredentialsException) {
        goTo('wrong-credentials');
      } else {
        goTo('unexpected-error');
      }
    }
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
