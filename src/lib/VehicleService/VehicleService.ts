import {
  BaseVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../models/Vehicle';
import { Http } from '../HttpClient';
import { Position, PositionTimestamps } from '../../models/Position';
import { Coordinates } from '../Dimension';
import { Angle, Length, Speed } from '../MeasurementUnit';
import { TraccarPosition, TraccarDevice } from '../Traccar';
import type {
  TraccarDeviceInterface,
  TraccarPositionInterface,
} from '../Traccar';
import { differenceInSeconds } from 'date-fns';

export async function fetchAll(signal?: AbortSignal): Promise<BaseVehicle[]> {
  const [responseVehicle, responsePositions] = await Promise.all([
    Http.request('/api/devices', { signal }),
    Http.request('/api/positions', { signal }),
  ]);

  const [vehiclesJson, positionsJson] = await Promise.all([
    responseVehicle.json(),
    responsePositions.json(),
  ]);

  const traccarDevices: TraccarDeviceInterface[] = vehiclesJson.map(
    (vehicle: unknown) => TraccarDevice.parse(vehicle),
  );
  const traccarPositions: TraccarPositionInterface[] = positionsJson.map(
    (position: unknown) => TraccarPosition.parse(position),
  );

  return traccarDevices.map((device) => {
    if (
      device.positionId === null ||
      device.positionId === 0 ||
      device.lastUpdate === null
    )
      return new NoPositionVehicle({
        id: String(device.id),
        name: device.name,
        imei: device.uniqueId,
      });

    const devicePosition = traccarPositions.find(
      (position) => position.deviceId === device.id,
    );

    if (devicePosition === undefined) {
      throw new Error(`Missing position data for device id ${device.id}`);
    }

    return convertTraccarDeviceToVehicle(device, devicePosition);
  });
}

function convertTraccarDeviceToVehicle(
  device: TraccarDeviceInterface,
  position: TraccarPositionInterface,
) {
  const { id, name, uniqueId, status } = device;

  const {
    id: positionId,
    latitude,
    longitude,
    altitude,
    speed,
    course,
    fixTime,
    deviceTime,
    serverTime,
    attributes: { ignition, motion, totalDistance },
  } = position;

  const positionObject = new Position({
    id: String(positionId),
    coordinates: new Coordinates(Number(latitude), Number(longitude)),
    altitude: Number(altitude),
    timestamps: new PositionTimestamps(
      new Date(fixTime),
      new Date(deviceTime),
      new Date(serverTime),
    ),
  });

  const Vehicle = pickVehicleConstructor(device);

  return new Vehicle({
    id: String(id),
    name: String(name),
    imei: String(uniqueId),
    position: positionObject,
    online: status === 'online',
    speed: new Speed.Knots(speed),
    course: new Angle.Degree(course),
    ignitionOn: ignition === true,
    inMotion: motion === true,
    mileage: new Length.Meter(totalDistance),
  });
}

function pickVehicleConstructor(
  device: TraccarDeviceInterface,
):
  | typeof OperationalVehicle
  | typeof DisabledVehicle
  | typeof UnavailableVehicle {
  if (device.disabled) return DisabledVehicle;
  else if (isLastUpdateAfterTooMuchTime(new Date(device.lastUpdate as string)))
    return UnavailableVehicle;

  return OperationalVehicle;
}

function isLastUpdateAfterTooMuchTime(lastUpdate: Date): boolean {
  const MINUTE = 60;
  const TOO_MUCH_SECONDS = 65 * MINUTE;

  return differenceInSeconds(new Date(), lastUpdate) >= TOO_MUCH_SECONDS;
}
