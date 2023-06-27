import { Router } from '@tanstack/router';
import { routeTree } from './routes';
import { PageLoadingIndicator } from '#ui/atoms';

export const defaultPendingComponent = PageLoadingIndicator;

export const router = new Router({
  routeTree,
  defaultPendingComponent,
});

// Register router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
