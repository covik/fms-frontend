import { composeStories } from '@storybook/react';
import * as stories from './vehicle-list-item.stories';
import { root } from './selectors';

const { Default, Selected, NotSelectable } = composeStories(stories);

it(`should fire onClick handler if mode is 'normal'`, () => {
  const clickStub = cy.stub().as('stub');
  cy.mount(<Default onClick={clickStub} />);
  cy.get('@stub').should('have.not.been.called');

  clickOnItem();

  cy.get('@stub').should('have.been.calledOnce');
});

it(`should fire onClick handler if mode 'selected'`, () => {
  const clickStub = cy.stub().as('stub');
  cy.mount(<Selected onClick={clickStub} />);
  cy.get('@stub').should('have.not.been.called');

  clickOnItem();

  cy.get('@stub').should('have.been.calledOnce');
});

it(`should not fire onClick handler if mode is 'not-selectable'`, () => {
  const clickStub = cy.stub().as('stub');
  cy.mount(<NotSelectable onClick={clickStub} />);
  cy.get('@stub').should('have.not.been.called');

  clickOnItem();

  cy.get('@stub').should('have.not.been.called');
});

function clickOnItem() {
  cy.get(`[data-testid=${root}]`).click();
}
