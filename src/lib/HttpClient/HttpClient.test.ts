import { describe, expect, it } from '@jest/globals';
import { request, HttpClientException, HttpNetworkException } from './';
import { createMockServer } from '../../mocks/server';
import { rest } from 'msw';

describe('Client errors', () => {
  const clientSideProblems = [
    {
      requestFunction: () => request('http/localhost'),
      errorName: 'TypeError',
      message: 'Failed to parse URL from http/localhost',
    },
    {
      requestFunction: () =>
        request('http://localhost', {
          headers: { 'C ontent-Type': 'text/xml' },
        }),
      errorName: 'TypeError',
      message: 'Headers.append: "C ontent-Type" is an invalid header name.',
    },
    {
      requestFunction: async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        const r = request('http://localhost', { signal });
        controller.abort();
        await r;
      },
      errorName: 'AbortError',
      message: 'This operation was aborted',
    },
  ];

  it.each(clientSideProblems)(
    'should contain original error as exception property',
    async ({ requestFunction, errorName, message }) => {
      let error;
      try {
        await requestFunction();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(HttpClientException);
      expect(error).toHaveProperty('originalError');

      const originalError = (error as HttpClientException).originalError;
      expect(originalError.name).toEqual(errorName);
      expect(originalError.message).toEqual(message);
    },
  );
});

describe('Network error', () => {
  createMockServer(
    rest.get('http://localhost', (req, res) => {
      res.networkError('A network error occurred');
    }),
  );
  it(`should throw ${HttpNetworkException.name} if a network error occurs`, async () => {
    await expect(() => request('http://localhost')).rejects.toThrow(
      HttpNetworkException,
    );
  });
});
