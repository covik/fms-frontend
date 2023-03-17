import {
  check,
  create,
  ValidationException,
  WrongCredentialsException,
} from './';

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
          testException(
            constructInvalidSessionRequest(emailOk, passwordOk),
          ).then(({ useError }) => {
            useError().should('be.instanceOf', ValidationException);
            useError().invoke('isEmailOk').should('equal', emailOk);
            useError().invoke('isPasswordOk').should('equal', passwordOk);
          });
        });
      });
    });

    describe('Problematic situations', () => {
      it(`should throw ${WrongCredentialsException.name} if server returns 401 status code`, () => {
        cy.intercept('POST', '/api/session', { statusCode: 401 });

        testException(constructValidSessionRequest).then(({ useError }) => {
          useError().should('be.instanceOf', WrongCredentialsException);
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

function testException(func: () => Promise<unknown>) {
  return cy
    .then(async () => {
      try {
        await func();
        return undefined;
      } catch (e) {
        return e;
      }
    })
    .then((e) => {
      cy.wrap(e).as('error');
      return Promise.resolve({ useError: () => cy.get('@error') });
    });
}
