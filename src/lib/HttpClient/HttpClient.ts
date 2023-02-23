import { HttpClientException } from './Exceptions';

export async function request(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    reject(new HttpClientException(new DOMException('AbortError')));
  });
}
