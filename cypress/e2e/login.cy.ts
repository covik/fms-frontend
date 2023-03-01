it('should have title of "Zara Fleet"', () => {
  cy.visit('/');
  cy.title().should('equal', 'Zara Fleet');
});

it('should show login form if user is not logged in', () => {
  cy.visit('/');
  cy.get('[data-testid="login-form"]').should('be.visible');
});
