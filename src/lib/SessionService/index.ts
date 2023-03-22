import { check, create } from './SessionService';
import { ValidationException, WrongCredentialsException } from './Exception';

export const Session = {
  check,
  create,
  ValidationException,
  WrongCredentialsException,
};
