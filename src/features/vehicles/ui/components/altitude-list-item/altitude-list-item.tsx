import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ImageFilterHdrOutline } from 'mdi-material-ui';

export interface AltitudeListItemAttributes {
  altitude: string;
}

export function AltitudeListItem({ altitude }: AltitudeListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <ImageFilterHdrOutline />
      </ListItemIcon>
      <ListItemText primary="Nadmorska visina" secondary={altitude} />
    </ListItem>
  );
}
