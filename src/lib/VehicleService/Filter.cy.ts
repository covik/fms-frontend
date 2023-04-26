import { Vehicle } from './';
import {
  BaseVehicle,
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  TimedOutVehicle,
} from '../../models/Vehicle';
import {
  baseVehicleAttrs,
  locatedVehicleAttributes,
} from '../../../cypress/fixtures/base-and-located-vehicle-attributes';

const vehiclesWithoutOperationalVehicles = [
  new BaseVehicle(baseVehicleAttrs),
  new TimedOutVehicle(locatedVehicleAttributes),
  new DisabledVehicle(locatedVehicleAttributes),
  new NoPositionVehicle(baseVehicleAttrs),
];

const operationalVehicles = [
  new OperationalVehicle(locatedVehicleAttributes),
  new OperationalVehicle(locatedVehicleAttributes),
];

describe(Vehicle.takeOnlyOperational.name, () => {
  it(`should throw ${TypeError.name} if passed argument is not array`, () => {
    cy.testException(async () => Vehicle.takeOnlyOperational('foobar')).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: string.',
        );
      },
    );

    cy.testException(async () =>
      Vehicle.takeOnlyOperational({ foo: 'bar' }),
    ).then((exception) => {
      exception().should('be.instanceOf', TypeError);
      exception().should(
        'have.property',
        'message',
        'Argument "data" should be array, received: object.',
      );
    });
  });

  specify('given empty array it should return empty array', () => {
    expect(Vehicle.takeOnlyOperational([])).to.deep.equal([]);
  });

  specify('given garbage data it should return empty array', () => {
    const garbageData = [null, 'foobar', 1234, {}, false, undefined];
    expect(Vehicle.takeOnlyOperational(garbageData)).to.deep.equal([]);
  });

  specify(
    `given different subclasses of ${BaseVehicle.name} but no ${OperationalVehicle.name} it should return empty array`,
    () => {
      expect(
        Vehicle.takeOnlyOperational(vehiclesWithoutOperationalVehicles),
      ).to.deep.equal([]);
    },
  );

  specify(
    `given mix of valid and invalid data it should return valid data`,
    () => {
      expect(
        Vehicle.takeOnlyOperational([
          ...vehiclesWithoutOperationalVehicles,
          ...operationalVehicles,
          undefined,
          false,
        ]),
      ).to.deep.equal(operationalVehicles);
    },
  );
});
