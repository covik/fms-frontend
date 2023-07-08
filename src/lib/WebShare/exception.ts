import { CustomError } from 'ts-custom-error';

export class NoNativeSharingMechanism extends CustomError {
  message = 'Platform does not support WebShare API or Clipboard API';
}
