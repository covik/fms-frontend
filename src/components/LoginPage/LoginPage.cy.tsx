import { LoginPage, testingSelectors } from './';
import { Session } from '../../lib/SessionService';

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

  it('should go to validation error state and show error message if email is empty', () => {
    cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`).type(
      'strong-password',
    );

    cy.get(`[data-testid="${testingSelectors.form}"]`).submit();

    cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
      .should('be.visible')
      .and('not.be.disabled');

    cy.contains('Email je obavezan').should('be.visible');
  });
});

function simulateSubmittingState() {
  cy.stub(Session, 'create', () => new Promise<void>(() => {}));
}
