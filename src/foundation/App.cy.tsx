import { App, AuthProvider } from './';
import { Session } from '../lib/SessionService';
import { testingSelectors } from './App';

describe(App.name, () => {
  it('should render full page spinner while fetching session information', () => {
    simulateFetchingState();
    cy.mount(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );
    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('be.visible');
  });

  it('should show login page if there is no active session', () => {
    simulateNoActiveSession();
    cy.mount(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );
    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
    cy.get(`[data-testid="${testingSelectors.loginPage}"]`).should(
      'be.visible',
    );
  });
});

function simulateFetchingState() {
  cy.stub(Session, 'check', () => new Promise(() => {}));
}

function simulateNoActiveSession() {
  cy.stub(Session, 'check', () => Promise.resolve(false));
}
