import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { CarBattery, Speedometer, TruckFast } from 'mdi-material-ui';
import fakeGoogleMap from './assets/google-map-fixtures/moving.png';

export interface VehicleAttributes {
  name: string;
  ignition: boolean;
  movement: 'moving' | 'stationary';
}

export function VehicleCard({ name, ignition, movement }: VehicleAttributes) {
  const headerColor = 'green';

  return (
    <Card sx={{ width: '360px' }}>
      <CardHeader
        avatar={<TruckFast fontSize="large" htmlColor={headerColor} />}
        title={
          <Typography
            component="h1"
            variant="h6"
            style={{ color: headerColor }}
          >
            {name}
          </Typography>
        }
        subheader="prije 2 minute"
      />
      <CardMedia component="img" image={fakeGoogleMap} />
      <CardContent>
        <List disablePadding dense>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <Speedometer />
            </ListItemIcon>
            <ListItemText primary="40 km/h" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <CarBattery />
            </ListItemIcon>
            <ListItemText primary="12.90 V" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
