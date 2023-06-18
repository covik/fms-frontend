import { lazy } from 'react';
import { TestRouterProvider } from './test-router';

const lazyLoadText = 'Lazy load successful';

const lazyComponent = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            // @ts-expect-error
            default: () => <div>{lazyLoadText}</div>,
          }),
        3000,
      ),
    ),
);

it(`should display loading spinner while fetching lazy-loaded route`, () => {
  const now = new Date();
  cy.clock(now);

  cy.mount(<TestRouterProvider component={lazyComponent} />);
  cy.get('[data-testid="page-loading-spinner"]').should('be.visible');

  cy.tick(2999);
  cy.contains(lazyLoadText).should('not.exist');

  cy.tick(1);
  cy.get('[data-testid="page-loading-spinner"]').should('not.exist');
  cy.contains(lazyLoadText).should('be.visible');
});
