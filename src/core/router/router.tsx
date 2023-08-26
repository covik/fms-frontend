import { RouterProvider } from '@tanstack/router';
import type { BaseRouterProps } from './types';

export * from '@tanstack/router';

export function BaseRouter({ router }: BaseRouterProps) {
  return <RouterProvider router={router} />;
}
