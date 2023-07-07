import { ReactElement, ReactNode } from 'react';
import { LinkOptions, RegisteredRoutesInfo } from '@tanstack/router';

export interface NavigationItem extends LinkOptions<RegisteredRoutesInfo> {
  label: string;
  icon?: ReactElement;
}
export type NavigationItems = NavigationItem[];
export type ActiveNavigationItem = NavigationItem | undefined;

export interface NavigationItemRenderer {
  (item: NavigationItem): ReactElement;
}

export interface ActiveNavigationItemResolver {
  (items: NavigationItems): ActiveNavigationItem;
}

export interface NavigationAPI {
  itemRenderer: NavigationItemRenderer;
  resolveActiveItem: ActiveNavigationItemResolver;
}

export interface NavigationProviderAttributes extends Partial<NavigationAPI> {
  children: ReactNode;
}
