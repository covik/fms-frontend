import { Button, Stack, styled, Typography } from '@mui/material';
import {
  Car,
  MapMarker,
  MapMarkerDistance,
  HumanHandsdown,
  RoadVariant,
} from 'mdi-material-ui';
import { Coordinates } from '#lib/dimension';

const Toolbar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export interface MapLocationInformationAttributes {
  latitude: number;
  longitude: number;
  headingInDegrees?: number;
}

export function MapLocationInformation({
  latitude,
  longitude,
  headingInDegrees = undefined,
}: MapLocationInformationAttributes) {
  const coordinates = new Coordinates(latitude, longitude);
  const temporarilyDisabled = true;

  return (
    <Stack spacing={1}>
      <Typography variant={'button'} component={'h6'} fontSize={'1.1rem'}>
        {coordinates.toString()}
      </Typography>

      <div>
        <Typography variant={'button'}>Udaljenost</Typography>
        <Toolbar>
          <Button
            startIcon={<Car />}
            size={'small'}
            disabled={temporarilyDisabled}
          >
            Vozila
          </Button>
          <Button
            startIcon={<MapMarkerDistance />}
            size={'small'}
            disabled={temporarilyDisabled}
          >
            Zračna
          </Button>
          <Button
            startIcon={<RoadVariant />}
            size={'small'}
            disabled={temporarilyDisabled}
          >
            Cestovna
          </Button>
        </Toolbar>
      </div>

      <div>
        <Typography variant={'button'}>Google</Typography>
        <Toolbar>
          <Button
            href={coordinates.toGoogleMapsUrl()}
            startIcon={<MapMarker />}
            size={'small'}
            target={'_blank'}
            rel={'noopener noreferrer nofollow'}
          >
            Karte
          </Button>
          <Button
            href={coordinates.toGoogleStreetViewUrl(headingInDegrees)}
            startIcon={<HumanHandsdown />}
            size={'small'}
            target={'_blank'}
            rel={'noopener noreferrer nofollow'}
          >
            Street View
          </Button>
        </Toolbar>
      </div>
    </Stack>
  );
}
