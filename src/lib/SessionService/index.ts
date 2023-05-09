import {
  check,
  cookie,
  create,
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
  obtain,
  ValidationException,
  WrongCredentialsException,
  rememberForOneYear,
  UserNotAuthenticatedException,
};
