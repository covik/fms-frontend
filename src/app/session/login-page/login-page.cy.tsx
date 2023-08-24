import { addDays, getUnixTime } from 'date-fns';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { LoginPage, testingSelectors } from '.';
import { SessionService } from '../../../core/auth/session-service';
import { ValidationError } from '../login-view/login-view.stories';

const messages = {
  incorrectEmail: ValidationError.args?.emailError as string,
  incorrectPassword: ValidationError.args?.passwordError as string,
  wrongCredentials: 'Pogrešan email ili lozinka',
  genericError: 'Došlo je do neočekivane greške',
};

beforeEach(() => {
  cy.mount(
    <QueryClientProvider client={createTestClient()}>
      <LoginPage />
    </QueryClientProvider>,
  );
});

const emailInput = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`);

const passwordInput = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`);

const submitButton = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`);

it('should render in initial state', () => {
  emailInput().should('be.visible').and('not.be.disabled');
  passwordInput().should('be.visible').and('not.be.disabled');
  submitButton().should('be.visible').and('not.be.disabled');
});

it('should go to submitting state after clicking a submit button', () => {
  simulateSubmittingState();

  submitForm();

  emailInput().should('be.visible').and('be.disabled');
  passwordInput().should('be.visible').and('be.disabled');
  submitButton().should('be.visible').and('be.disabled');
});

it('should go to validation error state and show error message if email is empty', () => {
  passwordInput().type('strong-password');

  submitForm();

  cy.contains(messages.incorrectEmail).should('be.visible');
  cy.contains(messages.incorrectPassword).should('not.exist');
});

it('should go to validation error state and show error message if password is empty', () => {
  emailInput().type('me@example.com');

  submitForm();

  cy.contains(messages.incorrectPassword).should('be.visible');
  cy.contains(messages.incorrectEmail).should('not.exist');
});

it('should go to error state and show error message if credentials do not match', () => {
  simulateWrongCredentialsSituation();
  fillForm();

  cy.contains(messages.wrongCredentials).should('not.exist');
  submitForm();
  cy.contains(messages.wrongCredentials).should('be.visible');
});

it('should go to error state and show error message if server error occurs', () => {
  simulateServerError();
  fillForm();

  cy.contains(messages.genericError).should('not.exist');
  submitForm();
  cy.contains(messages.genericError).should('be.visible');
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
  emailInput().type('me@example.com');
  passwordInput().type('strong-password');
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
