import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Counter } from 'mdi-material-ui';

export interface MileageListItemAttributes {
  mileage: string;
}

export function MileageListItem({ mileage }: MileageListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <Counter />
      </ListItemIcon>
      <ListItemText primary="Kilometraža" secondary={mileage} />
    </ListItem>
  );
}
