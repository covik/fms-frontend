import { useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../../lib/VehicleService';
import {
  DisabledVehicle,
  LocatedVehicle,
  UnavailableVehicle,
} from '../../../models/Vehicle';
import { useDateTime } from '#core/time';
import { Length, Speed, Voltage } from '../../../lib/MeasurementUnit';
import { VehicleLiveView } from '#ui/pages';
import type { VehicleLiveViewAttributes } from '#ui/pages';

type WarningVariant = VehicleLiveViewAttributes['warning'];

export function LivePreviewPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });
  const { distanceToNowStrictWithSuffix, formatDuration } = useDateTime();

  const { data: vehicle } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new Vehicle.NotFoundException();
      }

      return vehicle;
    },
    refetchInterval: 2000,
  });

  if (vehicle === undefined || !(vehicle instanceof LocatedVehicle))
    return null;

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

  return (
    <VehicleLiveView
      name={vehicle.name()}
      latitude={vehicle.position().latitude()}
      longitude={vehicle.position().longitude()}
      courseInDegrees={vehicle.course().value()}
      ignitionOn={vehicle.hasIgnitionTurnedOn()}
      moving={vehicle.isInMotion()}
      speed={formattedSpeed}
      mileage={formattedMileage}
      voltage={formattedPower}
      updatedAt={formattedFixTime}
      humanReadableCourse={formattedCourse}
      altitude={formattedAltitude}
      online={vehicle.isOnline()}
      latency={formattedLatency}
      warning={pickWarning(vehicle)}
    />
  );
}

function pickWarning(vehicle: LocatedVehicle): WarningVariant {
  if (vehicle instanceof UnavailableVehicle) return 'unavailable';
  if (vehicle instanceof DisabledVehicle) return 'disabled';
  return undefined;
}
