import {
  UserNotAuthenticatedException,
  ValidationException,
  WrongCredentialsException,
} from './exception';
import { Http } from '#lib/HttpClient';
// @ts-expect-error
import Cookies from 'js-cookie';
import { TraccarUser } from '#lib/Traccar';
import {
  Administrator,
  BaseUser,
  DisabledUser,
  StandardUser,
} from '../../../../models/User';

export const cookie = 'JSESSIONID';

export async function obtain(signal?: AbortSignal): Promise<BaseUser> {
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

export async function destroy(signal?: AbortSignal): Promise<void> {
  await Http.request('/api/session', { method: 'DELETE', signal });
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

export interface SessionCredentials {
  email: string;
  password: string;
}
