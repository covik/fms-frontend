import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigationRenderer } from '../navigation-renderer';
import type { NavigationItemAttributes } from '../types';

export function NavigationListItem(props: NavigationItemAttributes) {
  const ListItem = useNavigationRenderer(props);

  // odvojit vizualno?
  return (
    <ListItem>
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
    </ListItem>
  );
}
