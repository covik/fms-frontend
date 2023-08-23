import { Tab } from '@mui/material';
import { Link as RouterLink } from '@tanstack/router';
import type { TabProps } from '@mui/material';
import type { LinkOptions, RegisteredRoutesInfo } from '@tanstack/router';
import type { NavigationItemRenderer } from './interface';

export const TabRender: NavigationItemRenderer = (item) => (
  <Tab key={item.to} value={item.to} label={item.label} icon={item.icon} />
);

export const RouterTabRender: NavigationItemRenderer = ({
  label,
  icon,
  ...props
}) => {
  return (
    <RouterTab
      key={props.to}
      value={props.to}
      label={label}
      icon={icon}
      {...props}
    />
  );
};

const RouterTab = <
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
