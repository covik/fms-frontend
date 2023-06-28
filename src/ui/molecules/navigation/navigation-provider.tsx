import { createContext, useContext, useMemo } from 'react';
import { TabRender } from './navigation-item-renderer';
import type { NavigationAPI, NavigationProviderAttributes } from './interface';

function dummyActiveItemResolver() {
  return undefined;
}

const NavigationContext = createContext<NavigationAPI>({
  itemRenderer: TabRender,
  resolveActiveItem: dummyActiveItemResolver,
});

export function NavigationProvider({
  children,
  itemRenderer,
  resolveActiveItem,
}: NavigationProviderAttributes) {
  const {
    itemRenderer: currentItemRenderer,
    resolveActiveItem: currentActiveItemResolver,
  } = useNavigation();

  const value = useMemo<NavigationAPI>(
    () => ({
      itemRenderer: itemRenderer ?? currentItemRenderer,
      resolveActiveItem: resolveActiveItem ?? currentActiveItemResolver,
    }),
    [
      itemRenderer,
      currentItemRenderer,
      resolveActiveItem,
      currentActiveItemResolver,
    ],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationAPI {
  return useContext(NavigationContext);
}
