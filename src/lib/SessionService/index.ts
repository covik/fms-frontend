import { check, cookie, create, rememberForOneYear } from './SessionService';
import { ValidationException, WrongCredentialsException } from './Exception';

export const Session = {
  cookie,
  check,
  create,
  ValidationException,
  WrongCredentialsException,
  rememberForOneYear,
};
