import { styled, svgIconClasses } from '@mui/material';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const name = 'AppBar';

const AppBarRoot = styled('header', {
  name,
  slot: 'Root',
})({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr max-content',

  [`& .${svgIconClasses.root}`]: {
    display: 'block',
  },
});

export interface AppBarAttributes extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export function AppBar({ children, ...props }: AppBarAttributes) {
  return <AppBarRoot {...props}>{children}</AppBarRoot>;
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
