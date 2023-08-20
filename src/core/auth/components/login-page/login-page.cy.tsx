import { addDays, getUnixTime } from 'date-fns';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { LoginPage, testingSelectors } from '.';
import { SessionService } from '../../services';

beforeEach(() => {
  cy.mount(
    <QueryClientProvider client={createTestClient()}>
      <LoginPage />
    </QueryClientProvider>,
  );
});

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

  submitForm();

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

  submitForm();

  cy.contains('Email je obavezan').should('be.visible');
  cy.contains('Lozinka je obavezna').should('not.exist');
});

it('should go to validation error state and show error message if password is empty', () => {
  cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`).type(
    'me@example.com',
  );

  submitForm();

  cy.contains('Lozinka je obavezna').should('be.visible');
  cy.contains('Email je obavezan').should('not.exist');
});

it('should go to error state and show error message if credentials do not match', () => {
  simulateWrongCredentialsSituation();
  fillForm();

  cy.contains('Pogrešan email ili lozinka').should('not.exist');
  submitForm();
  cy.contains('Pogrešan email ili lozinka').should('be.visible');
});

it('should go to error state and show error message if server error occurs', () => {
  simulateServerError();
  fillForm();

  cy.contains('Došlo je do neočekivane greške').should('not.exist');
  submitForm();
  cy.contains('Došlo je do neočekivane greške').should('be.visible');
});

it('should remember session for one year after successful login', () => {
  const now = new Date();
  const oneYearFromNow = addDays(now, 365);
  cy.clock(now);

  simulateCorrectCredentialsSituation();
  fillForm();

  const [session, id] = simulateSessionCookieSetByBackend();
  submitForm();

  cy.getCookie(session).should('deep.include', {
    name: session,
    value: id,
    expiry: getUnixTime(oneYearFromNow),
    path: '/',
  });
});

function fillForm() {
  cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`).type(
    'me@example.com',
  );
  cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`).type(
    'strong-password',
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

function submitForm() {
  cy.get(`[data-testid="${testingSelectors.form}"]`).submit();
}

function simulateSubmittingState() {
  cy.stub(SessionService, 'create', () => new Promise<void>(() => {}));
}

function simulateWrongCredentialsSituation() {
  cy.intercept('POST', '/api/session', { statusCode: 401 });
}

function simulateServerError() {
  cy.intercept('POST', '/api/session', { statusCode: 500 });
}

function simulateCorrectCredentialsSituation() {
  cy.intercept('POST', '/api/session', { statusCode: 200 });
}

function simulateSessionCookieSetByBackend() {
  const name = SessionService.cookie;
  const value = 'random-string';
  cy.setCookie(name, value);

  return [name, value];
}
