import { RouterProvider } from '@tanstack/router';
import { PageLoadingIndicator } from '#ui/atoms/page-loading-indicator';
import type { BaseRouterAttributes } from './types';

export * from '@tanstack/router';

export function BaseRouter({ router }: BaseRouterAttributes) {
  return (
    <RouterProvider
      router={router}
      defaultPendingComponent={PageLoadingIndicator}
    />
  );
}
