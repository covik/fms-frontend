import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Timer, WifiStrength4, WifiStrengthOff } from 'mdi-material-ui';

export interface ConnectionDelayListItemAttributes {
  latency: string;
}

export function ConnectionDelayListItem({
  latency,
}: ConnectionDelayListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <Timer />
      </ListItemIcon>
      <ListItemText primary="Kašnjenje" secondary={latency} />
    </ListItem>
  );
}
