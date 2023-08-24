import { List } from '@mui/material';
import type { ReactNode } from 'react';

export interface NavigationListAttributes {
  children: ReactNode;
}

export function NavigationList({ children }: NavigationListAttributes) {
  return (
    <List disablePadding component={'nav'}>
      {children}
    </List>
  );
}
