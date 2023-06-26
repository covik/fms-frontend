import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CarBattery } from 'mdi-material-ui';

export interface VehicleBatteryListItemAttributes {
  voltage: string;
}

export function VehicleBatteryListItem({
  voltage,
}: VehicleBatteryListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <CarBattery />
      </ListItemIcon>
      <ListItemText primary="Napon" secondary={voltage} />
    </ListItem>
  );
}
