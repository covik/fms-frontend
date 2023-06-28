import { forwardRef } from 'react';
import { tabClasses, Tabs, tabsClasses } from '@mui/material';
import { useNavigation } from './navigation-provider';
import type { TabsProps } from '@mui/material';
import type { NavigationItems } from './interface';

export type NavigationAttributes = TabsProps<'nav'> & {
  items: NavigationItems;
};

export const navigationClasses = tabsClasses;
export const navigationItemClasses = tabClasses;

export const Navigation = forwardRef<any, NavigationAttributes>(
  (props, ref) => {
    const { resolveActiveItem, itemRenderer } = useNavigation();
    const { items, ...tabsProps } = props;
    const activeItem = resolveActiveItem(items);

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
