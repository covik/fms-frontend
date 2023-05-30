import { Card, Stack } from '@mui/material';
import { AppMap, MapSettingsProvider } from '../../Map';
import {
  ConnectionDetails,
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
import { convert } from '../../../lib/MeasurementUnit/Speed';

export interface LivePreviewViewAttributes {
  vehicle: LocatedVehicle;
}

export function LivePreviewView({ vehicle }: LivePreviewViewAttributes) {
  const { distanceToNowStrictWithSuffix } = useDateTime();
  const coordinates = vehicle.position().coordinates();
  const speedInKph = convert(vehicle.speed()).toKph();
  const roundedSpeed = Math.round(speedInKph.value());
  const formattedSpeed = `${roundedSpeed} ${speedInKph.symbol()}`;
  const formattedFixTime = distanceToNowStrictWithSuffix(
    vehicle.lastUpdatedAt(),
  );
  const formattedCourse = `${vehicle.course().value()} ${vehicle
    .course()
    .symbol()}`;
  const formattedAltitude = `${vehicle.position().altitude()}m`;

  return (
    <Stack spacing={1}>
      <MapSettingsProvider center={coordinates} zoom={8}>
        <AppMap
          gestureHandling={false}
          clickablePoi={false}
          sx={{ height: '40vh', minHeight: '200px' }}
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

      <Card>
        <StateDetails
          inMotion={vehicle.isInMotion()}
          hasIgnition={vehicle.hasIgnitionTurnedOn()}
          speed={formattedSpeed}
          lastFixTime={formattedFixTime}
        />
      </Card>

      <Card>
        <ConnectionDetails isActive={vehicle.isOnline()} />
      </Card>

      <Card>
        <SpatialDetails
          coordinates={coordinates.toString()}
          course={formattedCourse}
          altitude={formattedAltitude}
        />
      </Card>
    </Stack>
  );
}
