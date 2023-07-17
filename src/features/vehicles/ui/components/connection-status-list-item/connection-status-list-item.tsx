import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Wifi, WifiOff } from 'mdi-material-ui';

export interface ConnectionStatusListItemAttributes {
  active: boolean;
}

export function ConnectionStatusListItem({
  active,
}: ConnectionStatusListItemAttributes) {
  const statusText = active ? 'Aktivna' : 'Prekinuta';

  return (
    <ListItem>
      <ListItemIcon>{active ? <Wifi /> : <WifiOff />}</ListItemIcon>
      <ListItemText primary="Veza sa serverom" secondary={statusText} />
    </ListItem>
  );
}
