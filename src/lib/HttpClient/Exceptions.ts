import { CustomError } from 'ts-custom-error';

export class BaseException extends CustomError {}

/* Exceptions by origin */
export class ClientException extends BaseException {
  public constructor(public originalError: Error) {
    super();
  }
}
export class NetworkException extends BaseException {}
export class ServerException extends BaseException {
  public constructor(public response: Response) {
    super();
  }
}
