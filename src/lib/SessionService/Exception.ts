import { CustomError } from 'ts-custom-error';

export class ValidationException extends CustomError {
  public constructor(
    private emailInvalid: boolean,
    private passwordInvalid: boolean,
  ) {
    super();
  }

  public isEmailOk(): boolean {
    return !this.emailInvalid;
  }

  public isPasswordOk(): boolean {
    return !this.passwordInvalid;
  }
}

export class WrongCredentialsException extends CustomError {}

export class UserNotAuthenticatedException extends CustomError {}
