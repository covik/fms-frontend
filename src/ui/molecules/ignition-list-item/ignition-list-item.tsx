import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { IgnitionIcon } from '#ui/atoms';

export interface IgnitionListItemAttributes {
  on: boolean;
}

export function IgnitionListItem({ on }: IgnitionListItemAttributes) {
  const ignitionText = on ? 'Uključen' : 'Isključen';

  return (
    <ListItem>
      <ListItemIcon>
        <IgnitionIcon on={on} />
      </ListItemIcon>
      <ListItemText primary="Kontakt" secondary={ignitionText} />
    </ListItem>
  );
}
