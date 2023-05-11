import { Box, Card } from '@mui/material';
import { Map } from '../../Map';
import {
  ConnectionDetails,
  LatestInformation,
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

export interface LivePreviewViewAttributes {
  vehicle: LocatedVehicle;
}

export function LivePreviewView({ vehicle }: LivePreviewViewAttributes) {
  const { distanceToNowStrictWithSuffix } = useDateTime();
  const coordinates = vehicle.position().coordinates();
  const pos = {
    lat: coordinates.latitude(),
    lng: coordinates.longitude(),
  };
  const formattedSpeed = `${vehicle.speed().value()} ${vehicle
    .speed()
    .symbol()}`;
  const formattedFixTime = distanceToNowStrictWithSuffix(
    vehicle.lastUpdatedAt(),
  );
  const formattedCourse = `${vehicle.course().value()} ${vehicle
    .course()
    .symbol()}`;
  const formattedAltitude = `${vehicle.position().altitude()}m`;

  return (
    <Box>
      <Card sx={{ height: '40vh', minHeight: '200px', marginBottom: 1.5 }}>
        <Map
          x={coordinates.latitude()}
          y={coordinates.longitude()}
          z={8}
          width="100%"
          height="100%"
        >
          <VehicleMapMarker position={pos} name={vehicle.name()}>
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
        </Map>
      </Card>

      <LatestInformation>
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
      </LatestInformation>
    </Box>
  );
}
