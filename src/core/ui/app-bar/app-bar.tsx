import { styled, svgIconClasses } from '@mui/material';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const name = 'AppBar';

const AppBarRoot = styled('header', {
  name,
  slot: 'Root',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr max-content',
  gridTemplateAreas: '"menu content control-center"',
  alignItems: 'center',
  gap: theme.spacing(1),

  [`& .${svgIconClasses.root}`]: {
    display: 'block',
  },
}));

export const AppBarBarContainer = styled('div', {
  name,
  slot: 'Background',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  padding: theme.spacing(2),
}));

export interface AppBarAttributes extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export function AppBar({ children, ...props }: AppBarAttributes) {
  return <AppBarRoot {...props}>{children}</AppBarRoot>;
}

export const AreaContent = styled('section', {
  name,
  slot: 'Content',
})({
  gridArea: 'content',
});

export const AreaMenu = styled('section', {
  name,
  slot: 'Menu',
})({
  gridArea: 'menu',
});

export const AreaControlCenter = styled('section', {
  name,
  slot: 'ControlCenter',
})({
  gridArea: 'control-center',
});
