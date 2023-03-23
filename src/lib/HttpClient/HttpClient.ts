import {
  ClientException,
  NetworkException,
  ServerException,
} from './Exceptions';

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
      error.message === 'Failed to fetch'
        ? new NetworkException()
        : new ClientException(error),
    );
  }
}
