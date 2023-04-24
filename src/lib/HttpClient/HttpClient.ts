import {
  ClientException,
  NetworkException,
  ServerException,
} from './Exception';

export async function request(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  try {
    const request = new Request(input, init);
    const response = await fetch(request);
    if (!response.ok) return Promise.reject(new ServerException(response));
    return response;
  } catch (e) {
    const error = e as Error;
    return Promise.reject(
      isNetworkError(error)
        ? new NetworkException()
        : new ClientException(error),
    );
  }
}

function isNetworkError(error: Error): boolean {
  return (
    error.message === 'Failed to fetch' ||
    error.message === 'NetworkError when attempting to fetch resource.'
  );
}
