import { Tab } from '@mui/material';
import { RouterTab } from '../../../components/RouterTab';
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
