import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionManager } from '.';
import { AuthProvider } from '../auth';
import { Session } from '../../../lib/SessionService';
import { StandardUser } from '../../../models/User';
import { loadingIndicator } from '../ui/atoms/session-loading-indicator';
import { testingSelectors as loginSelectors } from '../ui/pages/login-view';
import {
  container as errorContainer,
  retryButton,
} from '../ui/molecules/session-error';

const authenticatedAppSelector = 'authenticated-app';

describe(SessionManager.name, () => {
  it('should render full page spinner while fetching session information', () => {
    stubSession().simulateFetching();

    mountApp();

    cy.get(`[data-testid="${loadingIndicator}"]`).should('be.visible');
  });

  it('should show login page if there is no active session', () => {
    stubSession().simulateNoActive();

    mountApp();

    cy.get(`[data-testid="${loadingIndicator}"]`).should('not.exist');
    cy.get(`[data-testid="${loginSelectors.container}"]`).should('be.visible');
  });

  it('should render authenticated app if there is active session', () => {
    stubSession().simulateActive();

    mountApp();

    cy.get(`[data-testid="${loadingIndicator}"]`).should('not.exist');
    cy.get(`[data-testid="${authenticatedAppSelector}"]`).should('be.visible');
  });

  it('should render authenticated app if login succeeds', () => {
    const session = stubSession();
    session.simulateNoActive();

    mountApp();
    fillForm();
    simulateSuccessfulLogin().then(session.simulateActive);
    submitForm();

    cy.get(`[data-testid="${authenticatedAppSelector}"]`).should('be.visible');
  });

  it('should render error view if fetching session fails', () => {
    stubSession().simulateFailure();

    mountApp();

    cy.get(`[data-testid="${loadingIndicator}"]`).should('not.exist');
    cy.get(`[data-testid="${errorContainer}"]`).should('be.visible');
  });

  specify(
    'given error view is rendered when retry button is clicked it should retry session fetching',
    () => {
      const session = stubSession();
      session.simulateFailure();
      mountApp();
      cy.get(`[data-testid="${errorContainer}"]`).should('be.visible');

      cy.then(session.simulateActive);
      cy.get(`[data-testid="${retryButton}"]`).click();

      cy.get(`[data-testid="${authenticatedAppSelector}"]`).should(
        'be.visible',
      );
    },
  );
});

function mountApp() {
  const queryClient = new QueryClient();

  cy.mount(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SessionManager>
          <div data-testid={authenticatedAppSelector}>
            Authenticated successfully!
          </div>
        </SessionManager>
      </AuthProvider>
    </QueryClientProvider>,
  );
}

function stubSession() {
  const stub = cy.stub(Session, 'obtain');

  const simulateFetching = () => stub.callsFake(() => new Promise(() => {}));

  const simulateNoActive = () =>
    stub.callsFake(() =>
      Promise.reject(new Session.UserNotAuthenticatedException()),
    );

  const simulateActive = () =>
    stub.callsFake(() =>
      Promise.resolve(
        new StandardUser({ id: 1, email: 'the@example.com', fullName: 'Test' }),
      ),
    );

  const simulateFailure = () =>
    stub.callsFake(() =>
      Promise.reject(new Error('Session fetch generic failure.')),
    );

  return {
    simulateFetching,
    simulateNoActive,
    simulateActive,
    simulateFailure,
  };
}

function simulateSuccessfulLogin() {
  return cy.intercept('POST', '/api/session', { statusCode: 200 });
}

function fillForm() {
  cy.get(`[data-testid="${loginSelectors.inputs.email}"] input`).type(
    'me@example.com',
  );
  cy.get(`[data-testid="${loginSelectors.inputs.password}"] input`).type(
    'strong-password',
  );
}

function submitForm() {
  cy.get(`[data-testid="${loginSelectors.form}"]`).submit();
}
