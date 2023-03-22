import { useState } from 'react';
import { LoginView } from './LoginView';
import { Session } from '../../lib/SessionService';
import type { LoginViewAttributes } from './LoginView';

export function LoginPage() {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');
  const [emailError, setEmailError] = useState('');

  async function tryLogin(email: string, password: string) {
    goTo('submitting');

    try {
      await Session.create({ email: '', password: 'stronk' });
    } catch (e) {
      goTo('validation-error');
      setEmailError('Email je obavezan');
    }
  }

  return (
    <LoginView
      state={currentState}
      emailError={emailError}
      passwordError={''}
      onLoginAttempt={tryLogin}
    />
  );
}
