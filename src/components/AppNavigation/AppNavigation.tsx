import { styled } from '@mui/material';
import {
  Navigation,
  navigationClasses,
  navigationItemClasses,
} from '../Navigation';
import type { NavigationItemRenderer } from '../Navigation';

const verticalStyles = {
  [`.${navigationItemClasses.root}`]: {
    minHeight: '76px',
    minWidth: 'auto',
  },
};
const StyledNavigation = styled(Navigation)(({ theme, orientation }) => ({
  [`.${navigationItemClasses.root}:not(.${navigationItemClasses.selected})`]: {
    color: theme.palette.text.primary,
  },
  [`.${navigationClasses.indicator}`]: {
    top: 0,
  },
  ...(orientation === 'vertical' ? verticalStyles : {}),
}));

export interface AppNavigationAttributes extends NavigationItemRenderer {
  vertical?: boolean;
}

export function AppNavigation({
  vertical = false,
  itemRenderer,
}: AppNavigationAttributes) {
  return (
    <StyledNavigation
      orientation={vertical ? 'vertical' : 'horizontal'}
      variant="fullWidth"
      itemRenderer={itemRenderer}
    />
  );
}
