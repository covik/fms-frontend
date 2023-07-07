import { Link as RouterLink } from '@tanstack/router';
import { Tab } from '@mui/material';
import type { TabProps } from '@mui/material';
import type { LinkOptions, RegisteredRoutesInfo } from '@tanstack/router';

export const RouterTab = <
  TFrom extends RegisteredRoutesInfo['routePaths'] = '/',
  TTo extends string = '',
>(
  props: LinkOptions<RegisteredRoutesInfo, TFrom, TTo> &
    Omit<TabProps, 'component'>,
) => {
  const propsWithOverriddenComponent = {
    ...props,
    component: RouterLink,
  };
  return <Tab {...propsWithOverriddenComponent} />;
};
