import { Http } from './';

describe('Request error', () => {
  const requestErrors = [
    {
      description: `given an invalid URL then throw ${Http.ClientException.name}`,
      arrange: () => Http.request('https://'),
      expectedError: 'TypeError',
      expectedMessage:
        "Failed to construct 'Request': Failed to parse URL from https://",
    },
    {
      description: `given URL contains username and password then throw ${Http.ClientException.name}`,
      arrange: () => Http.request('http://user:password@example.com/'),
      expectedError: 'TypeError',
      expectedMessage:
        "Failed to construct 'Request': Request cannot be constructed from a URL that includes credentials: http://user:password@example.com/",
    },
    {
      description: `given an invalid header name then throw ${Http.ClientException.name}`,
      arrange: () =>
        Http.request('http://localhost', {
          headers: { 'C ontent-Type': 'text/xml' },
        }),
      expectedError: 'TypeError',
      expectedMessage: "Failed to construct 'Request': Invalid name",
    },
    {
      description: `given a valid request when it gets aborted then throw ${Http.ClientException.name} if `,
      arrange: async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        const r = Http.request('http://localhost', { signal });
        controller.abort();
        await r;
      },
      expectedError: 'AbortError',
      expectedMessage: 'This operation was aborted',
    },
  ];

  requestErrors.forEach((situation) => {
    specify(situation.description, () => {
      cy.testException(situation.arrange).then((outcome) => {
        outcome().should('be.instanceOf', Http.ClientException);
        outcome().should('have.property', 'originalError');

        outcome()
          .its('originalError')
          .should('have.property', 'name', situation.expectedError);

        outcome()
          .its('originalError')
          .should('have.property', 'message', situation.expectedMessage);
      });
    });
  });
});

describe('Network error', () => {
  it(`should throw ${Http.NetworkException.name} if a network error occurs`, () => {
    cy.intercept('http://localhost', { forceNetworkError: true });
    cy.testException(() => Http.request('http://localhost')).then(
      (theError) => {
        theError().should('be.instanceOf', Http.NetworkException);
      },
    );
  });
});

describe('Response error', () => {
  describe(`should throw ${Http.ServerException.name} if a response status code is not 200-299`, () => {
    it('1xx: not testable', () => {
      cy.log('the tests hang until timeout');
    });
    it('2xx: no exception', () => {
      cy.intercept('http://localhost', { statusCode: 200 }).then(
        assertServerResponse().NotError,
      );
      cy.intercept('http://localhost', { statusCode: 299 }).then(
        assertServerResponse().NotError,
      );
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

describe('Response succeeded', () => {
  it('should return Response object with correct body and code', () => {
    const url = 'http://localhost';
    const statusCode = 200;
    const body = { testPassing: 'yay!' };
    cy.intercept(url, { statusCode, body });
    cy.then(async () => {
      const req = await Http.request(url);
      expect(req).to.have.property('status', statusCode);
      expect(await req.json()).to.deep.equal(body);
    });
  });
});

function assertServerResponse(code: number | undefined = undefined) {
  const requestChain = cy.testException(() => Http.request('http://localhost'));

  return {
    IsError: () =>
      requestChain.then((theError) => {
        theError().should('be.instanceOf', Http.ServerException);
        theError().its('response').should('be.instanceOf', Response);
        theError().its('response').its('status').should('equal', code);
      }),
    NotError: () =>
      requestChain.then((theError) => {
        theError().should('not.be.instanceOf', Http.ServerException);
      }),
  };
}
