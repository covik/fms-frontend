import { useParams } from '#core/router';
import { useQuery } from '@tanstack/react-query';
import {
  useAngle,
  useLength,
  useSpeed,
  useVoltage,
} from '#core/measurement-unit';
import { useDateTime } from '#core/time';
import { VehicleService } from '../../services/vehicle-service';
import {
  DisabledVehicle,
  LocatedVehicle,
  UnavailableVehicle,
} from '../../models/vehicle';
import { SingleVehicleTracking } from '../../ui/pages/single-vehicle-tracking';
import type { SingleVehicleTrackingAttributes } from '../../ui/pages/single-vehicle-tracking';

type WarningVariant = SingleVehicleTrackingAttributes['warning'];

export function SingleVehicleTrackingPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });
  const { formatCardinalDirection } = useAngle();
  const { distanceToNowStrictWithSuffix, formatDuration } = useDateTime();
  const { formatLengthProgressive } = useLength();
  const { formatSpeed } = useSpeed();
  const { formatVoltage } = useVoltage();

  const { data: vehicle } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new VehicleService.NotFoundException();
      }

      return vehicle;
    },
    refetchInterval: 2000,
  });

  if (vehicle === undefined || !(vehicle instanceof LocatedVehicle))
    return null;

  const formattedAltitude = `${vehicle.position().altitude()}m`;

  return (
    <SingleVehicleTracking
      name={vehicle.name()}
      latitude={vehicle.position().latitude()}
      longitude={vehicle.position().longitude()}
      courseInDegrees={vehicle.course().value()}
      ignitionOn={vehicle.hasIgnitionTurnedOn()}
      moving={vehicle.isInMotion()}
      speed={formatSpeed(vehicle.speed())}
      mileage={formatLengthProgressive(vehicle.mileage())}
      voltage={formatVoltage(vehicle.power())}
      updatedAt={distanceToNowStrictWithSuffix(vehicle.lastUpdatedAt())}
      humanReadableCourse={formatCardinalDirection(vehicle.course())}
      altitude={formattedAltitude}
      online={vehicle.isOnline()}
      latency={formatDuration(
        vehicle.position().timestamp().latencyInSeconds(),
      )}
      warning={pickWarning(vehicle)}
    />
  );
}

export default SingleVehicleTrackingPage;

function pickWarning(vehicle: LocatedVehicle): WarningVariant {
  if (vehicle instanceof UnavailableVehicle) return 'unavailable';
  if (vehicle instanceof DisabledVehicle) return 'disabled';
  return undefined;
}
