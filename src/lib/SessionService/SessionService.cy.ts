import { check } from './';

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
});
