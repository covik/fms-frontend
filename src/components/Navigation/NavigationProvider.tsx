import { createContext, useContext, useMemo } from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { ToOptions, RegisteredRoutesInfo } from '@tanstack/router';

export interface NavigationItem extends ToOptions<RegisteredRoutesInfo> {
  label: string;
  icon?: ReactElement;
}

export type NavigationItems = NavigationItem[];

export type ActiveNavigationItem = NavigationItem | undefined;

export interface Navigation {
  items: NavigationItems;
  activeItem: ActiveNavigationItem;
}

const NavigationContext = createContext<Navigation>({
  items: [],
  activeItem: undefined,
});

export function useNavigation() {
  const context = useContext(NavigationContext);

  return useMemo(
    () => ({
      items: context.items,
      activeItem: context.activeItem,
    }),
    [context.items, context.activeItem],
  );
}

export interface NavigationProviderAttributes extends Navigation {
  children: ReactNode;
}

export function NavigationProvider({
  items,
  activeItem,
  children,
}: NavigationProviderAttributes) {
  const value = useMemo<Navigation>(
    () => ({ items, activeItem }),
    [items, activeItem],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
