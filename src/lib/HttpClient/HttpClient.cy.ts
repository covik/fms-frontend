import { request, HttpClientException, HttpNetworkException } from './';

describe('Client errors', () => {
  const clientSideProblems = [
    {
      testName: `should throw ${HttpClientException.name} given an invalid URL`,
      requestFunction: () => request('https://'),
      errorName: 'TypeError',
      message:
        "Failed to construct 'Request': Failed to parse URL from https://",
    },
    {
      testName: `should throw ${HttpClientException.name} given a username and password are part of URL`,
      requestFunction: () => request('http://user:password@example.com/'),
      errorName: 'TypeError',
      message:
        "Failed to construct 'Request': Request cannot be constructed from a URL that includes credentials: http://user:password@example.com/",
    },
    {
      testName: `should throw ${HttpClientException.name} given an invalid header name`,
      requestFunction: () =>
        request('http://localhost', {
          headers: { 'C ontent-Type': 'text/xml' },
        }),
      errorName: 'TypeError',
      message: "Failed to construct 'Request': Invalid name",
    },
    {
      testName: `should throw ${HttpClientException.name} if request gets aborted`,
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

  clientSideProblems.forEach(
    ({ testName, requestFunction, errorName, message }) => {
      it(testName, () => {
        cy.testException(requestFunction).then((theError) => {
          theError().should('be.instanceOf', HttpClientException);
          theError().should('have.property', 'originalError');

          theError()
            .its('originalError')
            .should('have.property', 'name', errorName);

          theError()
            .its('originalError')
            .should('have.property', 'message', message);
        });
      });
    },
  );
});

describe('Network error', () => {
  it(`should throw ${HttpNetworkException.name} if a network error occurs`, () => {
    cy.intercept('http://localhost', { forceNetworkError: true });
    cy.testException(() => request('http://localhost')).then((theError) => {
      theError().should('be.instanceOf', HttpNetworkException);
    });
  });
});
