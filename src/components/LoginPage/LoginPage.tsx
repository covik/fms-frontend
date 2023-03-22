import { useState } from 'react';
import { LoginView } from './LoginView';
import { Session } from '../../lib/SessionService';
import type { LoginViewAttributes } from './LoginView';

export function LoginPage() {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function tryLogin(email: string, password: string) {
    goTo('submitting');

    try {
      await Session.create({ email, password });
    } catch (e) {
      goTo('validation-error');
      if (e instanceof Session.ValidationException) {
        !e.isEmailOk() && setEmailError('Email je obavezan');
        !e.isPasswordOk() && setPasswordError('Lozinka je obavezna');
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
