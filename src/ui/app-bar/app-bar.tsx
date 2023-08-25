import { styled } from '@mui/material';
import type { ReactNode } from 'react';

const name = 'AppBar';

const AppBarRoot = styled('header', {
  name,
  slot: 'Root',
})({});

export interface AppBarAttributes {
  children: ReactNode;
}

export function AppBar({ children }: AppBarAttributes) {
  return <AppBarRoot>{children}</AppBarRoot>;
}

export const AreaContent = styled('section', {
  name,
  slot: 'Content',
})({});

export const AreaMenu = styled('section', {
  name,
  slot: 'Menu',
})({});

export const AreaControlCenter = styled('section', {
  name,
  slot: 'ControlCenter',
})({});
