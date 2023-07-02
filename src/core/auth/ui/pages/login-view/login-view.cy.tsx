import { LoginView, testingSelectors } from '.';
import { composeStories } from '@storybook/react';
import * as stories from './login-view.stories';

const {
  Initial,
  Submitting,
  ValidationError,
  WrongCredentials,
  UnexpectedError,
} = composeStories(stories);

describe(LoginView.name, () => {
  describe(Initial.storyName!, () => {
    beforeEach(() => cy.mount(<Initial />));

    it('should have visible and not disabled email field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled password field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled submit button', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should execute login attempt handler on form submit', () => {
      const stub = cy.stub().as('loginAttempt');
      cy.mount(<Initial onLoginAttempt={stub} />);

      cy.get('@loginAttempt').should('not.have.been.called');
      cy.get(`[data-testid="${testingSelectors.form}"]`).submit();
      cy.get('@loginAttempt').should('have.been.calledOnce');
    });

    it('should pass form input values to attempt handler', () => {
      let email = 'test@example.com',
        password = 'strong-password';
      const stub = cy.stub().as('loginAttempt');
      cy.mount(<Initial onLoginAttempt={stub} />);

      cy.get(`[data-testid="${testingSelectors.inputs.email}"]`).type(email);
      cy.get(`[data-testid="${testingSelectors.inputs.password}"]`).type(
        password,
      );
      cy.get(`[data-testid="${testingSelectors.form}"]`).submit();
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
      cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
        .should('be.visible')
        .and('be.disabled');
    });

    it('should have visible and disabled password field', function () {
      cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
        .should('be.visible')
        .and('be.disabled');
    });

    it('should have visible and disabled submit button', function () {
      cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
        .should('be.visible')
        .and('be.disabled');
    });
  });

  describe(ValidationError.storyName!, () => {
    beforeEach(() => cy.mount(<ValidationError />));

    it('should have visible and not disabled email field with visible error message', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
        .should('be.visible')
        .and('not.be.disabled');

      cy.contains(ValidationError.args?.emailError!).should('be.visible');
    });

    it('should have visible and not disabled password field with visible error message', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
        .should('be.visible')
        .and('not.be.disabled');

      cy.contains(ValidationError.args?.passwordError!).should('be.visible');
    });

    it('should have visible and not disabled submit button', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
        .should('be.visible')
        .and('not.be.disabled');
    });
  });

  describe(WrongCredentials.storyName!, () => {
    beforeEach(() => cy.mount(<WrongCredentials />));

    it('should have visible error message', () => {
      cy.get(`[data-testid="${testingSelectors.result}"]`)
        .should('be.visible')
        .and('have.text', 'Pogrešan email ili lozinka');
    });

    it('should have visible and not disabled email field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled password field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled submit button', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
        .should('be.visible')
        .and('not.be.disabled');
    });
  });

  describe(UnexpectedError.storyName!, () => {
    beforeEach(() => cy.mount(<UnexpectedError />));

    it('should have visible error message', () => {
      cy.get(`[data-testid="${testingSelectors.result}"]`)
        .should('be.visible')
        .and('have.text', 'Došlo je do neočekivane greške');
    });

    it('should have visible and not disabled email field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.email}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled password field', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.password}"] input`)
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('should have visible and not disabled submit button', () => {
      cy.get(`[data-testid="${testingSelectors.inputs.submit}"]`)
        .should('be.visible')
        .and('not.be.disabled');
    });
  });
});
