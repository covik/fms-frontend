import { HttpClientException } from './Exceptions';

export async function request(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    try {
      new Request(input, init);
    } catch (e) {
      reject(new HttpClientException(e as Error));
    }
    reject(
      new HttpClientException(
        new DOMException('This operation was aborted', 'AbortError'),
      ),
    );
  });
}
