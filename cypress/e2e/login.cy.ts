it('should have title of "Zara Fleet"', () => {
  cy.visit('/');
  cy.title().should('equal', 'Zara Fleet');
});
