import { composeStories } from '@storybook/react';
import { testingSelectors } from '.';
import * as stories from './login-view.stories';

const states = composeStories(stories);
const {
  Initial,
  Submitting,
  ValidationError,
  WrongCredentials,
  UnexpectedError,
} = states;

const form = () => cy.get(`[data-testid="${testingSelectors.form}"]`);

const emailInput = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`);

const passwordInput = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`);

const submitButton = () =>
  cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`);

const formResult = () => cy.get(`[data-testid="${testingSelectors.result}"]`);

describe(Initial.storyName!, () => {
  beforeEach(() => cy.mount(<Initial />));

  verifyFormIsNotDisabled();

  it('should execute login attempt handler on form submit', () => {
    const stub = cy.stub().as('loginAttempt');
    cy.mount(<Initial onLoginAttempt={stub} />);

    cy.get('@loginAttempt').should('not.have.been.called');
    form().submit();
    cy.get('@loginAttempt').should('have.been.calledOnce');
  });

  it('should pass form input values to attempt handler', () => {
    let email = 'test@example.com',
      password = 'strong-password';
    const stub = cy.stub().as('loginAttempt');
    cy.mount(<Initial onLoginAttempt={stub} />);

    emailInput().type(email);
    passwordInput().type(password);
    form().submit();
    cy.get('@loginAttempt').should(
      'have.been.calledOnceWithExactly',
      email,
      password,
    );
  });
});

describe(Submitting.storyName!, () => {
  beforeEach(() => cy.mount(<Submitting />));

  it('should have visible and disabled email field', function () {
    emailInput().should('be.visible').and('be.disabled');
  });

  it('should have visible and disabled password field', function () {
    passwordInput().should('be.visible').and('be.disabled');
  });

  it('should have visible and disabled submit button', function () {
    submitButton().should('be.visible').and('be.disabled');
  });
});

describe(ValidationError.storyName!, () => {
  beforeEach(() => cy.mount(<ValidationError />));

  it('should have visible and not disabled email field with visible error message', () => {
    emailInput().should('be.visible').and('not.be.disabled');

    cy.contains(ValidationError.args?.emailError!).should('be.visible');
  });

  it('should have visible and not disabled password field with visible error message', () => {
    passwordInput().should('be.visible').and('not.be.disabled');

    cy.contains(ValidationError.args?.passwordError!).should('be.visible');
  });

  it('should have visible and not disabled submit button', () => {
    submitButton().should('be.visible').and('not.be.disabled');
  });

  describe(`field error message should only be visible in ${ValidationError.storyName}`, () => {
    const invalidStates = Object.values(states).filter(
      (state) => state !== ValidationError,
    );

    invalidStates.forEach((State) => {
      it(`should not render error messages in ${State.storyName}`, () => {
        const emailError = 'email error';
        const passwordError = 'password error';

        cy.mount(
          <State emailError={emailError} passwordError={passwordError} />,
        );
        cy.contains(emailError).should('not.exist');
        cy.contains(passwordError).should('not.exist');
      });
    });
  });
});

describe(WrongCredentials.storyName!, () => {
  beforeEach(() => cy.mount(<WrongCredentials />));

  it('should have visible error message', () => {
    formResult()
      .should('be.visible')
      .and('have.text', 'Pogrešan email ili lozinka');
  });

  verifyFormIsNotDisabled();
});

describe(UnexpectedError.storyName!, () => {
  beforeEach(() => cy.mount(<UnexpectedError />));

  it('should have visible error message', () => {
    formResult()
      .should('be.visible')
      .and('have.text', 'Došlo je do neočekivane greške');
  });

  verifyFormIsNotDisabled();
});

function verifyFormIsNotDisabled() {
  it('should have visible and not disabled email field', () => {
    emailInput().should('be.visible').and('not.be.disabled');
  });

  it('should have visible and not disabled password field', () => {
    passwordInput().should('be.visible').and('not.be.disabled');
  });

  it('should have visible and not disabled submit button', () => {
    submitButton().should('be.visible').and('not.be.disabled');
  });
}
