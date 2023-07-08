import { SessionService } from '.';
import { Http } from '../../../../lib/HttpClient';
import {
  Administrator,
  DisabledUser,
  StandardUser,
} from '../../../../models/user';

describe('obtain()', () => {
  it(`should throw ${SessionService.UserNotAuthenticatedException.name} if response code is 404`, () => {
    cy.intercept('GET', '/api/session', { statusCode: 404 });
    cy.testException(SessionService.obtain).then((theError) => {
      theError().should(
        'be.instanceOf',
        SessionService.UserNotAuthenticatedException,
      );
    });
  });

  it(`should throw ${Http.ServerException.name} if response code is not 200 nor 404`, () => {
    cy.intercept('GET', '/api/session', { statusCode: 500 });
    cy.testException(SessionService.obtain).then((theError) => {
      theError().should('be.instanceOf', Http.ServerException);
    });
  });

  it(`should throw ${Http.NetworkException.name} if network error occurs`, () => {
    cy.intercept('GET', '/api/session', { forceNetworkError: true });
    cy.testException(SessionService.obtain).then((theError) => {
      theError().should('be.instanceOf', Http.NetworkException);
    });
  });

  it(`should throw ${Http.ClientException.name} if request gets aborted`, () => {
    cy.testException(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      const request = SessionService.obtain(signal);
      controller.abort();
      return request;
    }).then((theError) => {
      theError().should('be.instanceOf', Http.ClientException);
    });
  });

  it(`should return ${DisabledUser.name} object if user account is disabled`, () => {
    cy.intercept('GET', '/api/session', {
      body: {
        id: 1,
        administrator: false,
        disabled: true,
        name: 'Disabled',
        email: 'disabled@example.com',
      },
      statusCode: 200,
    });

    cy.then(SessionService.obtain).as('user');
    cy.get('@user').should('be.instanceOf', DisabledUser);
    cy.get('@user').invoke('id').should('equal', 1);
    cy.get('@user').invoke('email').should('equal', 'disabled@example.com');
    cy.get('@user').invoke('fullName').should('equal', 'Disabled');
  });

  it(`should return ${Administrator.name} object if user account is administrator`, () => {
    cy.intercept('GET', '/api/session', {
      body: {
        id: 2,
        administrator: true,
        disabled: false,
        name: 'Admin',
        email: 'admin@example.com',
      },
      statusCode: 200,
    });

    cy.then(SessionService.obtain).as('user');
    cy.get('@user').should('be.instanceOf', Administrator);
    cy.get('@user').invoke('id').should('equal', 2);
    cy.get('@user').invoke('email').should('equal', 'admin@example.com');
    cy.get('@user').invoke('fullName').should('equal', 'Admin');
  });

  it(`should return ${DisabledUser.name} object if administrator account is disabled`, () => {
    cy.intercept('GET', '/api/session', {
      body: {
        id: 3,
        administrator: true,
        disabled: true,
        name: 'Disabled Admin',
        email: 'disabled-admin@example.com',
      },
      statusCode: 200,
    });

    cy.then(SessionService.obtain).as('user');
    cy.get('@user').should('be.instanceOf', DisabledUser);
    cy.get('@user').invoke('id').should('equal', 3);
    cy.get('@user')
      .invoke('email')
      .should('equal', 'disabled-admin@example.com');
    cy.get('@user').invoke('fullName').should('equal', 'Disabled Admin');
  });

  it(`should return ${StandardUser.name} object if account is not disabled nor admin`, () => {
    cy.intercept('GET', '/api/session', {
      body: {
        id: 4,
        administrator: false,
        disabled: false,
        name: 'User',
        email: 'user@example.com',
      },
      statusCode: 200,
    });
    cy.then(SessionService.obtain).as('user');
    cy.get('@user').should('be.instanceOf', StandardUser);
    cy.get('@user').invoke('id').should('equal', 4);
    cy.get('@user').invoke('email').should('equal', 'user@example.com');
    cy.get('@user').invoke('fullName').should('equal', 'User');
  });
});

describe('create()', () => {
  describe('Validation handling', () => {
    const matrix: [boolean, boolean, string][] = [
      [false, true, 'email empty'],
      [true, false, 'password empty'],
      [false, false, 'both empty'],
    ];

    matrix.forEach(([emailOk, passwordOk, title]) => {
      it(`should throw ${SessionService.ValidationException.name} if: ${title}`, () => {
        cy.testException(
          constructInvalidSessionServiceRequest(emailOk, passwordOk),
        ).then((theError) => {
          theError().should(
            'be.instanceOf',
            SessionService.ValidationException,
          );
          theError().invoke('isEmailOk').should('equal', emailOk);
          theError().invoke('isPasswordOk').should('equal', passwordOk);
        });
      });
    });
  });

  describe('Problematic situations', () => {
    it(`should throw ${SessionService.WrongCredentialsException.name} if server returns 401 status code`, () => {
      cy.intercept('POST', '/api/session', { statusCode: 401 });

      cy.testException(constructValidSessionServiceRequest).then((theError) => {
        theError().should(
          'be.instanceOf',
          SessionService.WrongCredentialsException,
        );
      });
    });

    it(`should throw ${Http.ServerException.name} if response code is not 200 nor 401`, () => {
      cy.intercept('POST', '/api/session', { statusCode: 500 });
      cy.testException(constructValidSessionServiceRequest).then((theError) => {
        theError().should('be.instanceOf', Http.ServerException);
      });
    });

    it(`should throw ${Http.NetworkException.name} if network error occurs`, () => {
      cy.intercept('POST', '/api/session', { forceNetworkError: true });
      cy.testException(constructValidSessionServiceRequest).then((theError) => {
        theError().should('be.instanceOf', Http.NetworkException);
      });
    });
  });

  describe('Constraints', () => {
    it('should send request as application/x-www-form-urlencoded content type', () => {
      let contentType = '';

      cy.intercept('POST', '/api/session', (req) => {
        contentType = (req.headers['content-type'] as string) ?? '';
        req.reply(200);
      });

      cy.then(constructValidSessionServiceRequest).then(() =>
        expect(contentType).to.equal('application/x-www-form-urlencoded'),
      );
    });

    it('should send credentials as query string in a request body', () => {
      let body = '';

      cy.intercept('POST', '/api/session', (req) => {
        body = (req.body as string) ?? '';
        req.reply(200);
      });

      cy.then(constructValidSessionServiceRequest).then(() =>
        expect(body).to.equal(
          'email=me%40example.com&password=strong-password',
        ),
      );
    });
  });
});

describe('destroy()', () => {
  it('should resolve if request returns 204 status code', () => {
    cy.intercept('DELETE', '/api/session', { statusCode: 204 }).as(
      'delete-session',
    );
    cy.then(SessionService.destroy);
    cy.get('@delete-session')
      .its('response')
      .should('have.property', 'statusCode', 204);
  });

  it(`should throw ${Http.ServerException.name} if response code is not 204`, () => {
    cy.intercept('DELETE', '/api/session', { statusCode: 500 });
    cy.testException(SessionService.destroy).then((theError) => {
      theError().should('be.instanceOf', Http.ServerException);
    });
  });

  it(`should throw ${Http.NetworkException.name} if network error occurs`, () => {
    cy.intercept('DELETE', '/api/session', { forceNetworkError: true });
    cy.testException(SessionService.destroy).then((theError) => {
      theError().should('be.instanceOf', Http.NetworkException);
    });
  });
});

function constructInvalidSessionServiceRequest(
  isEmailValid: boolean,
  isPasswordValid: boolean,
) {
  const determineInput = (input: boolean) => (input ? 'Good value' : '   ');

  return function () {
    return SessionService.create({
      email: determineInput(isEmailValid),
      password: determineInput(isPasswordValid),
    });
  };
}

function constructValidSessionServiceRequest() {
  return SessionService.create({
    email: 'me@example.com',
    password: 'strong-password',
  });
}
