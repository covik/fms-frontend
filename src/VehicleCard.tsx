import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CarBattery,
  DotsVertical,
  History,
  Pencil,
  ShareVariant,
  Speedometer,
  TruckFast,
  Wrench,
} from 'mdi-material-ui';
import fakeGoogleMap from './assets/google-map-fixtures/moving.png';
import { useState } from 'react';
import type { MouseEvent } from 'react';

export interface VehicleAttributes {
  name: string;
  ignition: boolean;
  movement: 'moving' | 'stationary';
}

export function VehicleCard({ name, ignition, movement }: VehicleAttributes) {
  const headerColor = 'green';

  const [anchor, setAnchor] = useState<undefined | HTMLElement>(undefined);
  const open = Boolean(anchor);
  const openVehicleActions = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchor(e.currentTarget);
  const closeVehicleActions = () => setAnchor(undefined);

  return (
    <Card sx={{ maxWidth: '360px' }}>
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
        <IconButton onClick={openVehicleActions}>
          <DotsVertical />
        </IconButton>
        <Menu
          open={open}
          onClose={closeVehicleActions}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          elevation={4}
        >
          <MenuItem dense>
            <ListItemIcon>
              <Pencil />
            </ListItemIcon>
            <ListItemText>Preimenuj</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem dense>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText>Lokacije</ListItemText>
          </MenuItem>
          <MenuItem dense>
            <ListItemIcon>
              <Wrench />
            </ListItemIcon>
            <ListItemText primary="Servisi"></ListItemText>
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}
