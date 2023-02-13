import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Battery,
  CarBattery,
  ClockOutline,
  DirectionsFork,
  ImageFilterHdr,
  LightningBolt,
  MapMarker,
  Navigation,
  SpeedometerSlow,
  WifiStrength4,
} from 'mdi-material-ui';

export function LatestInformation() {
  return (
    <Box sx={{ '> *:not(:first-child)': { marginTop: 1.5 } }}>
      <Card>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <Navigation />
            </ListItemIcon>
            <ListItemText primary="Kretanje" secondary="U pokretu" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LightningBolt />
            </ListItemIcon>
            <ListItemText primary="Kontakt" secondary="Uključen" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SpeedometerSlow />
            </ListItemIcon>
            <ListItemText primary="Brzina" secondary="10 km/h" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ClockOutline />
            </ListItemIcon>
            <ListItemText
              primary="Posljednja pozicija"
              secondary="prije manje od minute"
            />
          </ListItem>
        </List>
      </Card>
      <Card>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <WifiStrength4 />
            </ListItemIcon>
            <ListItemText primary="Veza sa serverom" secondary="Aktivna" />
          </ListItem>
        </List>
      </Card>
      <Card>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <CarBattery />
            </ListItemIcon>
            <ListItemText primary="Baterija" secondary="24.52 V" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Battery />
            </ListItemIcon>
            <ListItemText primary="Baterija GPS uređaja" secondary="3.81 V" />
          </ListItem>
        </List>
      </Card>
      <Card>
        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <MapMarker />
            </ListItemIcon>
            <ListItemText
              primary="Koordinate"
              secondary="44.1716433, 15.354705"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DirectionsFork />
            </ListItemIcon>
            <ListItemText primary="Smjer" secondary="60°" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ImageFilterHdr />
            </ListItemIcon>
            <ListItemText primary="Nadmorska visina" secondary="15m" />
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}
