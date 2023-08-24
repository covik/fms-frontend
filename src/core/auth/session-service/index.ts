import {
  cookie,
  create,
  destroy,
  obtain,
  rememberForOneYear,
} from './session-service';
import {
  UserNotAuthenticatedException,
  ValidationException,
  WrongCredentialsException,
} from './exception';

export const SessionService = {
  cookie,
  create,
  destroy,
  obtain,
  ValidationException,
  WrongCredentialsException,
  rememberForOneYear,
  UserNotAuthenticatedException,
};

export type { SessionCredentials } from './session-service';
