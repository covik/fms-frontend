import { Session } from './';
import { Http } from '../HttpClient';

describe('SessionService', () => {
  describe('check()', () => {
    it('should return false if request returns 404 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 404 });
      cy.then(Session.check).should('equal', false);
    });

    it('should return true if request returns 200 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 200 });
      cy.then(Session.check).should('equal', true);
    });

    it(`should throw ${Http.ServerException.name} if response code is not 200 nor 404`, () => {
      cy.intercept('GET', '/api/session', { statusCode: 500 });
      cy.testException(Session.check).then((theError) => {
        theError().should('be.instanceOf', Http.ServerException);
      });
    });

    it(`should throw ${Http.NetworkException.name} if network error occurs`, () => {
      cy.intercept('GET', '/api/session', { forceNetworkError: true });
      cy.testException(Session.check).then((theError) => {
        theError().should('be.instanceOf', Http.NetworkException);
      });
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
        it(`should throw ${Session.ValidationException.name} if: ${title}`, () => {
          cy.testException(
            constructInvalidSessionRequest(emailOk, passwordOk),
          ).then((theError) => {
            theError().should('be.instanceOf', Session.ValidationException);
            theError().invoke('isEmailOk').should('equal', emailOk);
            theError().invoke('isPasswordOk').should('equal', passwordOk);
          });
        });
      });
    });

    describe('Problematic situations', () => {
      it(`should throw ${Session.WrongCredentialsException.name} if server returns 401 status code`, () => {
        cy.intercept('POST', '/api/session', { statusCode: 401 });

        cy.testException(constructValidSessionRequest).then((theError) => {
          theError().should('be.instanceOf', Session.WrongCredentialsException);
        });
      });

      it(`should throw ${Http.ServerException.name} if response code is not 200 nor 401`, () => {
        cy.intercept('POST', '/api/session', { statusCode: 500 });
        cy.testException(constructValidSessionRequest).then((theError) => {
          theError().should('be.instanceOf', Http.ServerException);
        });
      });

      it(`should throw ${Http.NetworkException.name} if network error occurs`, () => {
        cy.intercept('POST', '/api/session', { forceNetworkError: true });
        cy.testException(constructValidSessionRequest).then((theError) => {
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

        cy.then(constructValidSessionRequest).then(() =>
          expect(contentType).to.equal('application/x-www-form-urlencoded'),
        );
      });

      it('should send credentials as query string in a request body', () => {
        let body = '';

        cy.intercept('POST', '/api/session', (req) => {
          body = (req.body as string) ?? '';
          req.reply(200);
        });

        cy.then(constructValidSessionRequest).then(() =>
          expect(body).to.equal(
            'email=me%40example.com&password=strong-password',
          ),
        );
      });
    });
  });
});

function constructInvalidSessionRequest(
  isEmailValid: boolean,
  isPasswordValid: boolean,
) {
  const determineInput = (input: boolean) => (input ? 'Good value' : '   ');

  return function () {
    return Session.create({
      email: determineInput(isEmailValid),
      password: determineInput(isPasswordValid),
    });
  };
}

function constructValidSessionRequest() {
  return Session.create({
    email: 'me@example.com',
    password: 'strong-password',
  });
}
