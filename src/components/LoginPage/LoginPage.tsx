import { useState } from 'react';
import { LoginView } from './LoginView';
import type { LoginViewAttributes } from './LoginView';

export function LoginPage() {
  const [currentState] = useState<LoginViewAttributes['state']>('initial');

  function tryLogin() {}

  return (
    <LoginView
      state={currentState}
      emailError={''}
      passwordError={''}
      onLoginAttempt={tryLogin}
    />
  );
}
