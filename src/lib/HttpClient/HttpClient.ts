import {
  HttpClientException,
  HttpNetworkException,
  HttpServerException,
} from './Exceptions';

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

    fetch(request as Request)
      .then((response) => {
        if (!response.ok) reject(new HttpServerException(response));
        else resolve(response);
      })
      .catch((e) => {
        if (e.message === 'Failed to fetch') {
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
