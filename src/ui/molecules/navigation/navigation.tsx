import { forwardRef } from 'react';
import { tabClasses, Tabs, tabsClasses } from '@mui/material';
import { useNavigation } from './navigation-provider';
import { RouterTabRender as DefaultItemRenderer } from './navigation-item-renderer';
import type { TabsProps } from '@mui/material';
import type { NavigationItemRenderer } from './navigation-item-renderer';

export type NavigationAttributes = TabsProps<'nav'> & {
  itemRenderer?: NavigationItemRenderer | undefined;
};

export const navigationClasses = tabsClasses;
export const navigationItemClasses = tabClasses;

export const Navigation = forwardRef<any, NavigationAttributes>(
  (props, ref) => {
    const { items, activeItem } = useNavigation();
    const { itemRenderer = DefaultItemRenderer, ...tabsProps } = props;

    if (items.length === 0) return null;

    return (
      <Tabs
        ref={ref}
        component={'nav'}
        value={activeItem ? activeItem.to : false}
        {...tabsProps}
      >
        {items.map(itemRenderer)}
      </Tabs>
    );
  },
);
Navigation.displayName = 'Navigation';
