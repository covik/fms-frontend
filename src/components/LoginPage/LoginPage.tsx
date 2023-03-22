import { useState } from 'react';
import { LoginView } from './LoginView';
import type { LoginViewAttributes } from './LoginView';

export function LoginPage() {
  const [currentState, goTo] =
    useState<LoginViewAttributes['state']>('initial');

  function tryLogin() {
    goTo('submitting');
  }

  return (
    <LoginView
      state={currentState}
      emailError={''}
      passwordError={''}
      onLoginAttempt={tryLogin}
    />
  );
}
