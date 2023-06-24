import { useMemo } from 'react';
import { useMatches } from '@tanstack/router';
import { NavigationProvider } from './NavigationProvider';
import type {
  ActiveNavigationItem,
  NavigationProviderAttributes,
} from './NavigationProvider';

export interface RouterNavigationProviderAttributes
  extends Omit<NavigationProviderAttributes, 'activeItem'> {}

export function RouterNavigationProvider({
  items,
  children,
}: RouterNavigationProviderAttributes) {
  const matches = useMatches();

  const activeItem = useMemo<ActiveNavigationItem>(() => {
    const routes = matches.map((match) => match.route);
    const routesWithoutParentRoute = routes.slice(1);
    const fullPaths: string[] = routesWithoutParentRoute.map(
      (route) => route.fullPath,
    );

    return items.find((item) => {
      if (fullPaths.includes(item.to ?? '')) return item;
    });
  }, [matches, items]);

  return (
    <NavigationProvider items={items} activeItem={activeItem}>
      {children}
    </NavigationProvider>
  );
}
