import { afterAll, afterEach, beforeAll } from '@jest/globals';
import { setupServer } from 'msw/node';

export function createMockServer(
  ...handlers: Parameters<typeof setupServer>
): ReturnType<typeof setupServer> {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
}
