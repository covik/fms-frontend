import {
  createMemoryHistory,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/router';
import { lazy } from 'react';
import { PageLoadingSpinner } from '../../components/Page';

const lazyLoadText = 'Lazy load successful';

const rootRoute = new RootRoute();

const lazyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/lazy',
  component: lazy(
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
  ),
});

const routeTree = rootRoute.addChildren([lazyRoute]);

const router = new Router({
  routeTree,
  history: createMemoryHistory({ initialEntries: ['/lazy'] }),
  defaultPendingComponent: PageLoadingSpinner,
});

it(`should display ${PageLoadingSpinner.name} component while fetching lazy-loaded route`, () => {
  const now = new Date();
  cy.clock(now);

  cy.mount(<RouterProvider router={router} />);
  cy.get('[data-testid="page-loading-spinner"]').should('be.visible');

  cy.tick(2999);
  cy.contains(lazyLoadText).should('not.exist');

  cy.tick(1);
  cy.get('[data-testid="page-loading-spinner"]').should('not.exist');
  cy.contains(lazyLoadText).should('be.visible');
});
