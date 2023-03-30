import { ValidationException, WrongCredentialsException } from './Exception';
import { Http } from '../HttpClient';

export async function check(): Promise<boolean> {
  try {
    await Http.request('/api/session');
    return true;
  } catch (e) {
    if (e instanceof Http.ServerException && e.response.status === 401) {
      return false;
    }
    throw e;
  }
}

export async function create(credentials: SessionCredentials): Promise<void> {
  const { email, password } = credentials;
  const { isEmailInvalid, isPasswordInvalid } =
    validateCredentials(credentials);
  if (isEmailInvalid || isPasswordInvalid)
    throw new ValidationException(isEmailInvalid, isPasswordInvalid);

  try {
    const body = new URLSearchParams({ email, password });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const method = 'POST';
    await Http.request('/api/session', { body, headers, method });
  } catch (e) {
    if (e instanceof Http.ServerException && e.response.status === 401) {
      throw new WrongCredentialsException();
    }

    throw e;
  }
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
