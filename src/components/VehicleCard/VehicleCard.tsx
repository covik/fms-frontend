import { Card, CardHeader, IconButton } from '@mui/material';
import { ShareVariant } from 'mdi-material-ui';
import fakeGoogleMap from '../../assets/google-map-fixtures/moving.png';
import fakeStationaryVehicle from '../../assets/google-map-fixtures/stationary.png';

export interface VehicleAttributes {
  name: string;
  ignition: boolean;
  movement: 'moving' | 'stationary';
}

export function VehicleCard({ name, ignition, movement }: VehicleAttributes) {
  const headerColor = ignition ? 'green' : 'orange';
  const image =
    ignition && movement === 'moving' ? fakeGoogleMap : fakeStationaryVehicle;

  return (
    <Card>
      <CardHeader
        avatar={<img src={image} />}
        title={name}
        titleTypographyProps={{
          color: headerColor,
          variant: 'h6',
          component: 'h1',
        }}
        subheader="prije 2 minute"
        action={
          <IconButton sx={{ marginTop: 1, marginRight: 1 }}>
            <ShareVariant fontSize="small" />
          </IconButton>
        }
        sx={{ padding: 1 }}
      />
    </Card>
  );
}
