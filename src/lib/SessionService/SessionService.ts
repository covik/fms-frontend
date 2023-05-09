import {
  UserNotAuthenticatedException,
  ValidationException,
  WrongCredentialsException,
} from './Exception';
import { Http } from '../HttpClient';
// @ts-expect-error
import Cookies from 'js-cookie';
import { Administrator, DisabledUser, StandardUser } from '../../models/User';
import { TraccarUser } from '../Traccar';

export const cookie = 'JSESSIONID';

export async function check(): Promise<boolean> {
  try {
    await Http.request('/api/session');
    return true;
  } catch (e) {
    if (e instanceof Http.ServerException && e.response.status === 404) {
      return false;
    }
    throw e;
  }
}

export async function obtain(signal?: AbortSignal): Promise<unknown> {
  try {
    const response = await Http.request('/api/session', { signal });
    const responseJson = await response.json();

    const parsedUser = TraccarUser.parse(responseJson);
    const userAttributes = {
      id: parsedUser.id,
      email: parsedUser.email,
      fullName: parsedUser.name,
    };

    if (parsedUser.disabled) return new DisabledUser(userAttributes);
    if (parsedUser.administrator) return new Administrator(userAttributes);
    return new StandardUser(userAttributes);
  } catch (e) {
    if (e instanceof Http.ServerException && e.response.status === 404) {
      throw new UserNotAuthenticatedException();
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

export function rememberForOneYear() {
  const value = String(Cookies.get(cookie));
  Cookies.set(cookie, value, { expires: 365, path: '/' });
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
