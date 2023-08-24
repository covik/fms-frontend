import { useCallback } from 'react';
import { useRouter } from '#core/router';
import { NavigationProvider } from './navigation-provider';
import { RouterTabRender } from './navigation-item-renderer';
import type {
  ActiveNavigationItemResolver,
  NavigationProviderAttributes,
} from './interface';

export interface RouterNavigationProviderAttributes
  extends Pick<NavigationProviderAttributes, 'children'> {}

export function RouterNavigationProvider({
  children,
}: RouterNavigationProviderAttributes) {
  const router = useRouter();
  const currentLocation = router.state.currentLocation;
  const matches = router.matchRoutes(currentLocation.pathname);

  const resolveActiveItemFromMatches =
    useCallback<ActiveNavigationItemResolver>(
      (items) => {
        const routes = matches.map((match) => match.route);
        const routesWithoutParentRoute = routes.slice(1);
        const fullPaths: string[] = routesWithoutParentRoute.map(
          (route) => route.fullPath,
        );
        const itemsShallowCopy = [...items];

        return itemsShallowCopy.reverse().find((item) => {
          if (fullPaths.includes(item.to ?? '')) return item;
        });
      },
      [matches],
    );

  return (
    <NavigationProvider
      itemRenderer={RouterTabRender}
      resolveActiveItem={resolveActiveItemFromMatches}
    >
      {children}
    </NavigationProvider>
  );
}
