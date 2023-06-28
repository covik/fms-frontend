import { forwardRef } from 'react';
import { styled } from '@mui/material';
import { Navigation, navigationItemClasses } from '#ui/molecules';
import type { NavigationAttributes } from '#ui/molecules';

const StyledNavigation = styled(Navigation)(({ theme }) => ({
  minHeight: '34px',

  [`.${navigationItemClasses.root}`]: {
    '&': {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      minHeight: 'auto',
      minWidth: 'auto',
    },

    [`&:not(.${navigationItemClasses.selected})`]: {
      color: theme.palette.text.primary,
    },
  },
}));

export interface PageNavigationAttributes
  extends Pick<NavigationAttributes, 'items'> {}

export const PageNavigation = forwardRef<any, PageNavigationAttributes>(
  (props, ref) => <StyledNavigation ref={ref} {...props} />,
);
PageNavigation.displayName = 'PageNavigation';
