import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MapMarkerOutline } from 'mdi-material-ui';

export interface CoordinatesListItemAttributes {
  coordinates: string;
}

export function CoordinatesListItem({
  coordinates,
}: CoordinatesListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <MapMarkerOutline />
      </ListItemIcon>
      <ListItemText primary="Koordinate" secondary={coordinates} />
    </ListItem>
  );
}
