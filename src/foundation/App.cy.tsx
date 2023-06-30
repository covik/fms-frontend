import { AuthProvider } from '../core/auth';
import { App, testingSelectors } from './App';
import { Session } from '../lib/SessionService';
import { StandardUser } from '../models/User';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

const authenticatedAppSelector = 'authenticated-app';

describe(App.name, () => {
  it('should render full page spinner while fetching session information', () => {
    stubSession().simulateFetching();

    mountApp();

    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('be.visible');
  });

  it('should show login page if there is no active session', () => {
    stubSession().simulateNoActive();

    mountApp();

    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
    cy.get(`[data-testid="${testingSelectors.login.page}"]`).should(
      'be.visible',
    );
  });

  it('should render authenticated app if there is active session', () => {
    stubSession().simulateActive();

    mountApp();

    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
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

    cy.get(`[data-testid="${testingSelectors.spinner}"]`).should('not.exist');
    cy.get(`[data-testid="${testingSelectors.failure.container}"]`).should(
      'be.visible',
    );
  });

  specify(
    'given error view is rendered when retry button is clicked it should retry session fetching',
    () => {
      const session = stubSession();
      session.simulateFailure();
      mountApp();
      cy.get(`[data-testid="${testingSelectors.failure.container}"]`).should(
        'be.visible',
      );

      cy.then(session.simulateActive);
      cy.get(`[data-testid="${testingSelectors.failure.retry}"]`).click();

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
        <App>
          <div data-testid={authenticatedAppSelector}>
            Authenticated successfully!
          </div>
        </App>
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
  cy.get(`[data-testid="${testingSelectors.login.email}"] input`).type(
    'me@example.com',
  );
  cy.get(`[data-testid="${testingSelectors.login.password}"] input`).type(
    'strong-password',
  );
}

function submitForm() {
  cy.get(`[data-testid="${testingSelectors.login.form}"]`).submit();
}
