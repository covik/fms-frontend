import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import type { ReactNode } from 'react';
import type { NavigationItem as NavigationItemAttributes } from './types';

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

export function NavigationItem({ label, icon }: NavigationItemAttributes) {
  return (
    <ListItemButton component={'div'}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
}
