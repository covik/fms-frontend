import { faker as defaultFaker } from '@faker-js/faker';
import {
  BaseVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '.';
import { Angle, Length, Speed, Voltage } from '#lib/measurement-unit';
import { createPosition } from '../position/factory';
import type { Faker } from '@faker-js/faker';
import type { BaseVehicleAttributes } from './base-vehicle';
import type { LocatedVehicleAttributes } from './located-vehicle';

const imeiLength = 16;
class MockBaseVehicle extends BaseVehicle {}

interface FactoryAttributes {
  faker?: Faker;
}

export function createBaseVehicleAttributes(
  faker: Faker,
): BaseVehicleAttributes {
  const id = faker.string.uuid();
  const imei = faker.string.numeric({ length: imeiLength });
  const licensePlate = faker.vehicle.vrm();

  return {
    id,
    imei,
    name: licensePlate,
  };
}

export function createLocatedVehicleAttributes(
  faker: Faker,
): LocatedVehicleAttributes {
  const { id, imei, name } = createBaseVehicleAttributes(faker);
  const course = new Angle.Degree(faker.number.int({ min: 0, max: 360 }));
  const ignitionOn = faker.datatype.boolean();
  const inMotion = faker.datatype.boolean({
    probability: ignitionOn ? 0.5 : 0,
  });
  const mileage = new Length.Meter(
    faker.number.float({ min: 1000000, max: 1000000000, precision: 0.1 }),
  );
  const online = faker.datatype.boolean({ probability: 0.7 });
  const position = createPosition();
  const speed = new Speed.KPH(
    inMotion ? faker.number.float({ min: 0, max: 140, precision: 0.1 }) : 0,
  );
  const power = new Voltage.Volt(
    faker.number.float({ min: 11, max: 30, precision: 0.1 }),
  );

  return {
    id,
    imei,
    name,
    course,
    ignitionOn,
    inMotion,
    mileage,
    online,
    position,
    speed,
    power,
  };
}

export function createOperationalVehicle(props?: FactoryAttributes) {
  const faker = props?.faker ?? defaultFaker;
  const attrs = createLocatedVehicleAttributes(faker);
  return new OperationalVehicle(attrs);
}

export function createUnavailableVehicle(props?: FactoryAttributes) {
  const faker = props?.faker ?? defaultFaker;
  const attrs = createLocatedVehicleAttributes(faker);
  return new UnavailableVehicle(attrs);
}

export function createDisabledVehicle(props?: FactoryAttributes) {
  const faker = props?.faker ?? defaultFaker;
  const attrs = createLocatedVehicleAttributes(faker);
  return new DisabledVehicle(attrs);
}

export function createVehicleWithoutPosition(props?: FactoryAttributes) {
  const faker = props?.faker ?? defaultFaker;
  return new NoPositionVehicle(createBaseVehicleAttributes(faker));
}

export function createBaseVehicleMock(props?: FactoryAttributes) {
  const faker = props?.faker ?? defaultFaker;
  return new MockBaseVehicle(createBaseVehicleAttributes(faker));
}
