import { Box, Grid, Stack } from '@mui/material';
import { AppMap, MapSettingsProvider } from '../../Map';
import {
  BatteryState,
  ConnectionDetails,
  InformationContainer,
  MileageDetails,
  SpatialDetails,
  StateDetails,
} from './LatestInformation';
import { LocatedVehicle } from '../../../models/Vehicle';
import { VehicleMapMarker } from '../../VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../../VehicleMapIcon';
import { useDateTime } from '../../../foundation';
import { Length, Speed, Voltage } from '../../../lib/MeasurementUnit';
import { Tile } from '../../Tile';
import { formatDuration } from '../../../utils/date';

export interface LivePreviewViewAttributes {
  vehicle: LocatedVehicle;
}

export function LivePreviewView({ vehicle }: LivePreviewViewAttributes) {
  const { distanceToNowStrictWithSuffix } = useDateTime();
  const coordinates = vehicle.position().coordinates();
  const speedInKph = Speed.convert(vehicle.speed()).toKph();
  const formattedSpeed = Speed.format(speedInKph);
  const formattedFixTime = distanceToNowStrictWithSuffix(
    vehicle.lastUpdatedAt(),
  );
  const formattedCourse = `${vehicle.course().value()} ${vehicle
    .course()
    .symbol()}`;
  const formattedAltitude = `${vehicle.position().altitude()}m`;
  const formattedMileage = Length.adaptiveFormat(vehicle.mileage(), 1);
  const formattedLatency = formatDuration(
    vehicle.position().timestamp().latencyInSeconds(),
  );
  const formattedPower = Voltage.format(vehicle.power());

  const spacing = 1;
  return (
    <Grid container spacing={spacing} flex={1}>
      <Grid
        item
        xs={12}
        md={4}
        lg={3}
        order={{ xs: 1, md: 0 }}
        position={'relative'}
      >
        <Box
          sx={(theme) => ({
            position: {
              md: 'absolute',
              xs: 'static',
            },
            top: theme.spacing(spacing),
            bottom: 0,
            left: theme.spacing(spacing),
            right: 0,
            overflow: { md: 'auto', xs: 'unset' },
            padding: '2px', // otherwise card box shadow is invisible
            margin: '-2px',
          })}
        >
          <Stack spacing={spacing}>
            <Tile label={'Vozilo'}>
              <InformationContainer>
                <StateDetails
                  inMotion={vehicle.isInMotion()}
                  hasIgnition={vehicle.hasIgnitionTurnedOn()}
                  speed={formattedSpeed}
                />
                <BatteryState voltage={formattedPower} />
                <MileageDetails mileage={formattedMileage} />
              </InformationContainer>
            </Tile>

            <Tile label={'Lokacija'}>
              <InformationContainer>
                <SpatialDetails
                  coordinates={coordinates.toString()}
                  lastFixTime={formattedFixTime}
                  course={formattedCourse}
                  altitude={formattedAltitude}
                />
              </InformationContainer>
            </Tile>

            <Tile label={'Mreža'}>
              <InformationContainer>
                <ConnectionDetails
                  isActive={vehicle.isOnline()}
                  latency={formattedLatency}
                />
              </InformationContainer>
            </Tile>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9} flex={1} display={'flex'}>
        <MapSettingsProvider center={coordinates} zoom={8}>
          <AppMap
            gestureHandling={false}
            clickablePoi={false}
            sx={{ minHeight: '40vmax', flex: 1 }}
          >
            <VehicleMapMarker position={coordinates} name={vehicle.name()}>
              {vehicle.isInMotion() ? (
                <VehicleMapIconMoving
                  active={vehicle.hasIgnitionTurnedOn()}
                  angle={vehicle.course().value()}
                />
              ) : (
                <VehicleMapIconStationary
                  active={vehicle.hasIgnitionTurnedOn()}
                />
              )}
            </VehicleMapMarker>
          </AppMap>
        </MapSettingsProvider>
      </Grid>
    </Grid>
  );
}
