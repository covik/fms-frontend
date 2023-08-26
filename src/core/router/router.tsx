import { RouterProvider } from '@tanstack/router';
import { PageLoadingIndicator } from '#ui/atoms/page-loading-indicator';
import type { BaseRouterProps } from './types';

export * from '@tanstack/router';

export function BaseRouter({ router }: BaseRouterProps) {
  return (
    <RouterProvider
      router={router}
      defaultPendingComponent={PageLoadingIndicator}
    />
  );
}
