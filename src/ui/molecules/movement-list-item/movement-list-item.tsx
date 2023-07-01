import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MovementIcon } from '#ui/atoms/movement-icon';

export interface MovementListItemAttributes {
  moving: boolean;
  speed: string;
}

export function MovementListItem({
  moving,
  speed,
}: MovementListItemAttributes) {
  const movementStateText = moving ? 'U pokretu' : 'Zaustavljen';
  const movementText = `${movementStateText} (${speed})`;

  return (
    <ListItem>
      <ListItemIcon>
        <MovementIcon moving={moving} />
      </ListItemIcon>
      <ListItemText primary="Kretanje" secondary={movementText} />
    </ListItem>
  );
}
