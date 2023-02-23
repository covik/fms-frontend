import { HttpClientException, HttpNetworkException } from './Exceptions';

export async function request(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    let request;

    try {
      request = new Request(input, init);
    } catch (e) {
      reject(new HttpClientException(e as Error));
    }

    fetch(request as Request).catch((e) => {
      if (e.message === 'fetch failed') {
        reject(new HttpNetworkException());
      } else
        reject(
          new HttpClientException(
            new DOMException('This operation was aborted', 'AbortError'),
          ),
        );
    });
  });
}
