import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionManager } from '.';
import { SessionService } from '../../core/auth/session-service';
import { loadingIndicator } from './session-loading-indicator';
import { testingSelectors as loginSelectors } from './login-view';
import { container as errorContainer, retryButton } from './session-error';
import { retryCount } from '#core/auth/hooks/auth';

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

  it(`should render error view if fetching session fails for ${retryCount} times`, () => {
    const session = stubSession().simulateFailure();

    mountApp();

    cy.get(`[data-testid="${loadingIndicator}"]`).should('not.exist');
    cy.get(`[data-testid="${errorContainer}"]`).should('be.visible');

    const initialCall = 1;
    cy.then(() => expect(session.callCount - initialCall).to.equal(retryCount));
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
  cy.mount(
    <QueryClientProvider client={createTestClient()}>
      <SessionManager>
        <div data-testid={authenticatedAppSelector}>
          Authenticated successfully!
        </div>
      </SessionManager>
    </QueryClientProvider>,
  );
}

function createTestClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        retryDelay: 0,
      },
    },
  });
}

function stubSession() {
  const stub = cy.stub(SessionService, 'obtain');

  const simulateFetching = () => stub.callsFake(() => new Promise(() => {}));

  const simulateNoActive = () =>
    stub.callsFake(() =>
      Promise.reject(new SessionService.UserNotAuthenticatedException()),
    );

  const simulateActive = () => stub.callsFake(() => Promise.resolve('1'));

  const simulateFailure = () =>
    stub.callsFake(() =>
      Promise.reject(new Error('SessionService fetch generic failure.')),
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
