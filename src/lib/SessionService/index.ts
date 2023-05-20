import {
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
  create,
  destroy,
  obtain,
  ValidationException,
  WrongCredentialsException,
  rememberForOneYear,
  UserNotAuthenticatedException,
};
