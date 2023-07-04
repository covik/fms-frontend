import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ClockOutline } from 'mdi-material-ui';

export interface LocationUpdateTimeListItemAttributes {
  updatedAt: string;
}

export function LocationUpdateTimeListItem({
  updatedAt,
}: LocationUpdateTimeListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <ClockOutline />
      </ListItemIcon>
      <ListItemText primary="Ažurirana" secondary={updatedAt} />
    </ListItem>
  );
}
