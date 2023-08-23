import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigationRenderer } from './navigation-renderer';
import type { ReactNode } from 'react';
import type { NavigationItemAttributes } from './types';

export interface NavigationListAttributes {
  children: ReactNode;
}

export function Navigation({ children }: NavigationListAttributes) {
  return (
    <List disablePadding component={'nav'}>
      {children}
    </List>
  );
}

export function NavigationItem(props: NavigationItemAttributes) {
  const Item = useNavigationRenderer(props);

  return (
    <Item>
      {(selected: boolean) => (
        <ListItemButton component={'div'} selected={selected}>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText>{props.label}</ListItemText>
        </ListItemButton>
      )}
    </Item>
  );
}
