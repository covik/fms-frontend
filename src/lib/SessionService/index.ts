import {
  check,
  cookie,
  create,
  destroy,
  obtain,
  rememberForOneYear,
} from './SessionService';
import {
  UserNotAuthenticatedException,
  ValidationException,
  WrongCredentialsException,
} from './Exception';

export const Session = {
  cookie,
  check,
  create,
  destroy,
  obtain,
  ValidationException,
  WrongCredentialsException,
  rememberForOneYear,
  UserNotAuthenticatedException,
};
