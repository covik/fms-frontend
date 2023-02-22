import { CustomError } from 'ts-custom-error';

export class BaseHttpException extends CustomError {}

/* Exceptions by origin */
export class HttpClientException extends BaseHttpException {
  public constructor(public originalError: Error) {
    super();
  }
}
export class HttpNetworkException extends BaseHttpException {}
export class HttpServerException extends BaseHttpException {}
