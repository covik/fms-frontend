import { Router } from '@tanstack/router';
import { indexRoute, rootRoute, vehiclesRoute } from './routes';

const routeTree = rootRoute.addChildren([indexRoute, vehiclesRoute]);
export const router = new Router({ routeTree });

// Register router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
