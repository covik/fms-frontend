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
});

function simulateFetchingState() {
  cy.stub(Session, 'check', () => new Promise(() => {}));
}
