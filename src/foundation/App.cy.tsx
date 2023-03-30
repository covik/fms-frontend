import { App, AuthProvider } from './';
import { Session } from '../lib/SessionService';
import { testingSelectors } from './App';

const authenticatedAppSelector = 'authenticated-app';

describe(App.name, () => {
  it('should render full page spinner while fetching session information', () => {
    simulateFetchingState();
    mountApp();
    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('be.visible');
  });

  it('should show login page if there is no active session', () => {
    simulateNoActiveSession();
    mountApp();
    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
    cy.get(`[data-testid="${testingSelectors.loginPage}"]`).should(
      'be.visible',
    );
  });

  it('should render authenticated app if there is active session', () => {
    simulateActiveSession();
    mountApp();
    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
    cy.get(`[data-testid="${authenticatedAppSelector}"]`).should('be.visible');
  });
});

function mountApp() {
  cy.mount(
    <AuthProvider>
      <App>
        <div data-testid={authenticatedAppSelector}>
          Authenticated successfully!
        </div>
      </App>
    </AuthProvider>,
  );
}

function simulateFetchingState() {
  cy.stub(Session, 'check', () => new Promise(() => {}));
}

function simulateNoActiveSession() {
  cy.stub(Session, 'check', () => Promise.resolve(false));
}

function simulateActiveSession() {
  cy.stub(Session, 'check', () => Promise.resolve(true));
}
