import { styled } from '@mui/material';
import {
  Navigation,
  navigationClasses,
  navigationItemClasses,
} from '#ui/molecules/navigation/navigation';
import type { NavigationAttributes } from '#ui/molecules/navigation/navigation';

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

export interface AppNavigationAttributes
  extends Pick<NavigationAttributes, 'items'> {
  vertical?: boolean;
}

export function AppNavigation({
  items,
  vertical = false,
}: AppNavigationAttributes) {
  return (
    <StyledNavigation
      orientation={vertical ? 'vertical' : 'horizontal'}
      variant="fullWidth"
      items={items}
    />
  );
}
