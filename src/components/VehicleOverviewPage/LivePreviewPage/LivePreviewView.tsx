import { Box, Stack } from '@mui/material';
import {
  NetworkStateBlock,
  LocationStateBlock,
  VehicleStateBlock,
} from '#ui/organisms';
import { AppMap, MapSettingsProvider } from '../../Map';
import { VehicleMapMarker } from '../../VehicleMapMarker';
import {
  VehicleMapIconMoving,
  VehicleMapIconStationary,
} from '../../VehicleMapIcon';
import { useDateTime } from '../../../foundation';
import { Length, Speed, Voltage } from '../../../lib/MeasurementUnit';
import { Grid, GridContent, GridSidebarTiles } from '../Grid';
import { DisabledVehicle, UnavailableVehicle } from '../../../models/Vehicle';
import {
  WarningVehicleUnavailable,
  WarningVehicleDisabled,
} from '../VehicleWarning';
import type { LocatedVehicle } from '../../../models/Vehicle';

export interface LivePreviewViewAttributes {
  vehicle: LocatedVehicle;
}

export function LivePreviewView({ vehicle }: LivePreviewViewAttributes) {
  const { distanceToNowStrictWithSuffix, formatDuration } = useDateTime();

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
    <>
      {renderWarning(vehicle)}
      <Grid>
        <GridSidebarTiles>
          <Stack spacing={spacing}>
            <VehicleStateBlock
              ignitionOn={vehicle.hasIgnitionTurnedOn()}
              mileage={formattedMileage}
              moving={vehicle.isInMotion()}
              speed={formattedSpeed}
              voltage={formattedPower}
            />

            <LocationStateBlock
              altitude={formattedAltitude}
              coordinates={coordinates.toString()}
              course={formattedCourse}
              updatedAt={formattedFixTime}
            />

            <NetworkStateBlock
              active={vehicle.isOnline()}
              latency={formattedLatency}
            />
          </Stack>
        </GridSidebarTiles>
        <GridContent>
          <MapSettingsProvider center={coordinates} zoom={8}>
            <AppMap
              gestureHandling={false}
              clickablePoi={false}
              sx={{ height: '100%' }}
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
        </GridContent>
      </Grid>
    </>
  );
}

function renderWarning(vehicle: LocatedVehicle) {
  const sx = { marginBottom: 1 };

  if (vehicle instanceof UnavailableVehicle)
    return (
      <Box sx={sx}>
        <WarningVehicleUnavailable />
      </Box>
    );

  if (vehicle instanceof DisabledVehicle)
    return (
      <Box sx={sx}>
        <WarningVehicleDisabled />
      </Box>
    );

  return null;
}
