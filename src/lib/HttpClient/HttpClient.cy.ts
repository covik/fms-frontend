import {
  request,
  HttpClientException,
  HttpNetworkException,
  HttpServerException,
} from './';

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

describe('Server errors', () => {
  describe(`should throw ${HttpServerException.name} if a response status code is not 200-299`, () => {
    it('1xx: not testable', () => {
      cy.log('the tests hang until timeout');
    });
    it('2xx: no exception', () => {
      let code = -1;
      cy.intercept('http://localhost', (res) => res.reply(code));

      cy.then(() => (code = 200)).then(assertServerResponse().NotError);
      cy.then(() => (code = 299)).then(assertServerResponse().NotError);
    });
    it('3xx: not testable', () => {
      cy.log('after issuing 3xx code every request afterwards resolves to 3xx');
      cy.log('restarting Cypress is needed to restore normal behavior');
    });
    it('4xx 5xx: exception', () => {
      cy.intercept('http://localhost', { statusCode: 400 }).then(
        assertServerResponse(400).IsError,
      );
      cy.intercept('http://localhost', { statusCode: 599 }).then(
        assertServerResponse(599).IsError,
      );
    });
  });
});

describe('Successful response', () => {
  it('should return Response object with correct body and code', () => {
    const url = 'http://localhost';
    const statusCode = 200;
    const body = { testPassing: 'yay!' };
    cy.intercept(url, { statusCode, body });
    cy.then(async () => {
      const req = await request(url);
      expect(req).to.have.property('status', statusCode);
      expect(await req.json()).to.deep.equal(body);
    });
  });
});

function assertServerResponse(code: number | undefined = undefined) {
  const requestChain = cy.testException(() => request('http://localhost'));

  return {
    IsError: () =>
      requestChain.then((theError) => {
        theError().should('be.instanceOf', HttpServerException);
        theError().its('response').should('be.instanceOf', Response);
        theError().its('response').its('status').should('equal', code);
      }),
    NotError: () =>
      requestChain.then((theError) => {
        theError().should('not.be.instanceOf', HttpServerException);
      }),
  };
}
