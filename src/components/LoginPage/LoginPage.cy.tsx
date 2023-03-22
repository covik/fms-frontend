import { LoginPage, testingSelectors } from './';

describe(LoginPage.name, () => {
  beforeEach(() => cy.mount(<LoginPage />));

  it('should render in initial state', () => {
    cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
      .should('be.visible')
      .and('not.be.disabled');

    cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
      .should('be.visible')
      .and('not.be.disabled');

    cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should go to submitting state after clicking a submit button', () => {
    simulateSubmittingState();

    cy.get(`[data-testid="${testingSelectors.form}"]`).submit();

    cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
      .should('be.visible')
      .and('be.disabled');

    cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
      .should('be.visible')
      .and('be.disabled');

    cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
      .should('be.visible')
      .and('be.disabled');
  });
});

function simulateSubmittingState() {}
