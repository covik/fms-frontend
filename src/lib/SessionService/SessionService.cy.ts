import { Session } from './';
import { Http } from '../HttpClient';

describe('SessionService', () => {
  describe('check()', () => {
    it('should return false if request returns 401 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 401 });
      cy.then(Session.check).should('equal', false);
    });

    it('should return true if request returns 200 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 200 });
      cy.then(Session.check).should('equal', true);
    });

    it(`should throw ${Http.ServerException.name} if response code is not 200 nor 401`, () => {
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
