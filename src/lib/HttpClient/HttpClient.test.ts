import { describe, expect, it } from '@jest/globals';
import { request, HttpClientException } from './';

describe('Client errors', () => {
  describe('Abort request', () => {
    function abortRequest() {
      const controller = new AbortController();
      const signal = controller.signal;
      const r = request('http://localhost', { signal });
      controller.abort();
      return r;
    }

    it(`should throw ${HttpClientException.name} client exception if request gets aborted`, async () => {
      await expect(abortRequest).rejects.toThrow(HttpClientException);
    });

    it('should contain original AbortError in exception property "originalError"', async () => {
      await expect(abortRequest).rejects.toHaveProperty(
        'originalError',
        new DOMException('AbortError'),
      );
    });
  });
});
