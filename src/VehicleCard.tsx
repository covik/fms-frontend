import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CarBattery,
  DotsVertical,
  ShareVariant,
  Speedometer,
  TruckFast,
} from 'mdi-material-ui';
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
        title={name}
        titleTypographyProps={{
          color: headerColor,
          variant: 'h6',
          component: 'h1',
        }}
        subheader="prije 2 minute"
      />
      <CardMedia component="img" image={fakeGoogleMap} />
      <CardContent sx={{ display: 'none' }}>
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
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton>
          <ShareVariant />
        </IconButton>
        <IconButton>
          <DotsVertical />
        </IconButton>
      </CardActions>
    </Card>
  );
}
