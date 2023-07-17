import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { TimerOutline } from 'mdi-material-ui';

export interface ConnectionDelayListItemAttributes {
  latency: string;
}

export function ConnectionDelayListItem({
  latency,
}: ConnectionDelayListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <TimerOutline />
      </ListItemIcon>
      <ListItemText primary="Kašnjenje" secondary={latency} />
    </ListItem>
  );
}
