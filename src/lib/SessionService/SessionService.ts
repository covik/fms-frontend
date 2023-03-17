import { ValidationException, WrongCredentialsException } from './Exception';

export async function check(): Promise<boolean> {
  const response = await fetch('/api/session');
  return response.status === 200;
}

export async function create(credentials: SessionCredentials): Promise<void> {
  const { email, password } = credentials;
  const { isEmailInvalid, isPasswordInvalid } =
    validateCredentials(credentials);
  if (isEmailInvalid || isPasswordInvalid)
    throw new ValidationException(isEmailInvalid, isPasswordInvalid);

  throw new WrongCredentialsException();
}

function validateCredentials(credentials: SessionCredentials) {
  return {
    isEmailInvalid: credentials.email.trim() === '',
    isPasswordInvalid: credentials.password.trim() === '',
  };
}

interface SessionCredentials {
  email: string;
  password: string;
}
