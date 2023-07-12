import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MapMarker } from 'mdi-material-ui';

export interface CoordinatesListItemAttributes {
  coordinates: string;
}

export function CoordinatesListItem({
  coordinates,
}: CoordinatesListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <MapMarker />
      </ListItemIcon>
      <ListItemText primary="Koordinate" secondary={coordinates} />
    </ListItem>
  );
}
