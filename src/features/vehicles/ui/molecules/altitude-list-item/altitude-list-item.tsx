import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ImageFilterHdr } from 'mdi-material-ui';

export interface AltitudeListItemAttributes {
  altitude: string;
}

export function AltitudeListItem({ altitude }: AltitudeListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <ImageFilterHdr />
      </ListItemIcon>
      <ListItemText primary="Nadmorska visina" secondary={altitude} />
    </ListItem>
  );
}
