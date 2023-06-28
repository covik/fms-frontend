import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { WifiStrength4, WifiStrengthOff } from 'mdi-material-ui';

export interface ConnectionStatusListItemAttributes {
  active: boolean;
}

export function ConnectionStatusListItem({
  active,
}: ConnectionStatusListItemAttributes) {
  const statusText = active ? 'Aktivna' : 'Prekinuta';

  return (
    <ListItem>
      <ListItemIcon>
        {active ? <WifiStrength4 /> : <WifiStrengthOff />}
      </ListItemIcon>
      <ListItemText primary="Veza sa serverom" secondary={statusText} />
    </ListItem>
  );
}
