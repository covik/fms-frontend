import { BaseRouter, Router } from '#core/router';
import { routeTree } from './routes';

// Register router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof productionRouter;
  }
}

const productionRouter = new Router({ routeTree });

export function ProductionRouter() {
  return <BaseRouter router={productionRouter} />;
}
