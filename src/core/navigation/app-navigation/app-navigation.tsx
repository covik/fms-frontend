import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
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

  // odvojit vizualno?
  return (
    <Item>
      {(selected: boolean) => (
        <ListItemButton component={'div'} selected={selected}>
          <ListItemIcon>
            <Typography color={selected ? 'primary' : 'inherit'}>
              {props.icon}
            </Typography>
          </ListItemIcon>

          <ListItemText>
            <Typography color={selected ? 'primary' : 'inherit'}>
              {props.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      )}
    </Item>
  );
}
