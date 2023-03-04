it('should have title of "Zara Fleet"', () => {
  cy.visit('/');
  cy.title().should('equal', 'Zara Fleet');
});

it('should show login form if user is not logged in', () => {
  cy.visit('/');
  cy.get('[data-testid="login-form"]').should('be.visible');
});

it('should display loading indicator on form submit', () => {
  cy.visit('/');

  cy.get('[data-testid="progress-indicator"]').should('not.exist');
  cy.get('[type=submit]').click().should('be.disabled');
  cy.get('[data-testid="progress-indicator"]').should('be.visible');
});

it('should notify user all fields are required', () => {
  cy.visit('/');
  cy.get('[name="email"]').should('be.empty');
  cy.get('[name="password"]').should('be.empty');

  cy.contains('Email je obavezan').should('not.exist');
  cy.contains('Lozinka je obavezna').should('not.exist');
  cy.get('[type=submit]').click();
  cy.contains('Email je obavezan').should('be.visible');
  cy.contains('Lozinka je obavezna').should('be.visible');
});

it('should notify user if credentials are wrong', () => {
  cy.visit('/');
  cy.get('[data-testid="form-result"]').should('not.exist');

  cy.get('[name="email"]').type('wrong@example.com');
  cy.get('[name="password"]').type('incorrect');
  cy.get('[type=submit]').click();

  cy.get('[data-testid="form-result"]')
    .should('be.visible')
    .and('have.text', 'Pogrešan email ili lozinka');
});
