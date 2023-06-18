import { Router } from '@tanstack/router';
import { routeTree } from './routes';
import { PageLoadingSpinner } from '../../components/Page';

export const defaultPendingComponent = PageLoadingSpinner;

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
