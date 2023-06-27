import { List } from '@mui/material';
import type { ReactNode } from 'react';

export interface TileListContentAttributes {
  children: ReactNode;
}

export function TileListContent({ children }: TileListContentAttributes) {
  return (
    <List disablePadding dense>
      {children}
    </List>
  );
}
