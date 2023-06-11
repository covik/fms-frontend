import { Vehicle } from './';
import {
  BaseVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../models/Vehicle';
import {
  createDisabledVehicle,
  createOperationalVehicle,
  createUnavailableVehicle,
  createVehicleWithoutPosition,
} from '../../models/Vehicle/factory';

const garbageData = [null, 'foobar', 1234, {}, false, undefined];

const vehiclesWithoutOperationalVehicles = [
  createUnavailableVehicle,
  createDisabledVehicle(),
  createVehicleWithoutPosition(),
];

const vehiclesWithoutUnavailableVehicles = [
  createOperationalVehicle(),
  createDisabledVehicle(),
  createVehicleWithoutPosition(),
];

const operationalVehicles = [
  createOperationalVehicle(),
  createOperationalVehicle(),
];

const unavailableVehicles = [
  createUnavailableVehicle(),
  createUnavailableVehicle(),
];

describe(Vehicle.takeOnlyOperational.name, () => {
  it(`should throw ${TypeError.name} if passed argument is not array`, () => {
    cy.testException(() => Vehicle.takeOnlyOperational('foobar')).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: string.',
        );
      },
    );

    cy.testException(() => Vehicle.takeOnlyOperational({ foo: 'bar' })).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: object.',
        );
      },
    );
  });

  specify('given empty array it should return empty array', () => {
    expect(Vehicle.takeOnlyOperational([])).to.deep.equal([]);
  });

  specify('given garbage data it should return empty array', () => {
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

describe(Vehicle.takeOnlyOperational.name, () => {
  it(`should throw ${TypeError.name} if passed argument is not array`, () => {
    cy.testException(() => Vehicle.takeOnlyUnavailable('foobar')).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: string.',
        );
      },
    );

    cy.testException(() => Vehicle.takeOnlyUnavailable({ foo: 'bar' })).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: object.',
        );
      },
    );
  });

  specify('given empty array it should return empty array', () => {
    expect(Vehicle.takeOnlyUnavailable([])).to.deep.equal([]);
  });

  specify('given garbage data it should return empty array', () => {
    expect(Vehicle.takeOnlyUnavailable(garbageData)).to.deep.equal([]);
  });

  specify(
    `given different subclasses of ${BaseVehicle.name} but no ${UnavailableVehicle.name} it should return empty array`,
    () => {
      expect(
        Vehicle.takeOnlyUnavailable(vehiclesWithoutUnavailableVehicles),
      ).to.deep.equal([]);
    },
  );

  specify(
    `given mix of valid and invalid data it should return valid data`,
    () => {
      expect(
        Vehicle.takeOnlyUnavailable([
          ...vehiclesWithoutUnavailableVehicles,
          ...unavailableVehicles,
          undefined,
          false,
        ]),
      ).to.deep.equal(unavailableVehicles);
    },
  );
});
