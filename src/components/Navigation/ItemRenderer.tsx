import { Tab } from '@mui/material';
import { RouterTab } from '../RouterTab';
import type { NavigationItem } from './NavigationProvider';
import type { ReactElement } from 'react';

export type ItemRenderer = (item: NavigationItem) => ReactElement;

export const TabRender: ItemRenderer = (item) => (
  <Tab key={item.to} value={item.to} label={item.label} icon={item.icon} />
);

export const RouterTabRender: ItemRenderer = ({ label, icon, ...props }) => {
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
