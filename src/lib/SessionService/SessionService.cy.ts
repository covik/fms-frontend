import { Session } from './';
const { check, create, ValidationException, WrongCredentialsException } =
  Session;

describe('SessionService', () => {
  describe('check()', () => {
    it('should return false if request returns non-200 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 401 });
      cy.then(check).should('equal', false);
    });

    it('should return true if request returns 200 status code', () => {
      cy.intercept('GET', '/api/session', { statusCode: 200 });
      cy.then(check).should('equal', true);
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
        it(`should throw ${ValidationException.name} if: ${title}`, () => {
          cy.testException(
            constructInvalidSessionRequest(emailOk, passwordOk),
          ).then((theError) => {
            theError().should('be.instanceOf', ValidationException);
            theError().invoke('isEmailOk').should('equal', emailOk);
            theError().invoke('isPasswordOk').should('equal', passwordOk);
          });
        });
      });
    });

    describe('Problematic situations', () => {
      it(`should throw ${WrongCredentialsException.name} if server returns 401 status code`, () => {
        cy.intercept('POST', '/api/session', { statusCode: 401 });

        cy.testException(constructValidSessionRequest).then((theError) => {
          theError().should('be.instanceOf', WrongCredentialsException);
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
    return create({
      email: determineInput(isEmailValid),
      password: determineInput(isPasswordValid),
    });
  };
}

function constructValidSessionRequest() {
  return create({ email: 'me@example.com', password: 'strong-password' });
}
