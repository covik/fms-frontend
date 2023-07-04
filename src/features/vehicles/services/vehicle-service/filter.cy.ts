import { VehicleService } from '.';
import {
  BaseVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '../../models/vehicle';
import {
  createDisabledVehicle,
  createOperationalVehicle,
  createUnavailableVehicle,
  createVehicleWithoutPosition,
} from '../../models/vehicle/factory';

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

describe(VehicleService.takeOnlyOperational.name, () => {
  it(`should throw ${TypeError.name} if passed argument is not array`, () => {
    cy.testException(() => VehicleService.takeOnlyOperational('foobar')).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: string.',
        );
      },
    );

    cy.testException(() =>
      VehicleService.takeOnlyOperational({ foo: 'bar' }),
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
    expect(VehicleService.takeOnlyOperational([])).to.deep.equal([]);
  });

  specify('given garbage data it should return empty array', () => {
    expect(VehicleService.takeOnlyOperational(garbageData)).to.deep.equal([]);
  });

  specify(
    `given different subclasses of ${BaseVehicle.name} but no ${OperationalVehicle.name} it should return empty array`,
    () => {
      expect(
        VehicleService.takeOnlyOperational(vehiclesWithoutOperationalVehicles),
      ).to.deep.equal([]);
    },
  );

  specify(
    `given mix of valid and invalid data it should return valid data`,
    () => {
      expect(
        VehicleService.takeOnlyOperational([
          ...vehiclesWithoutOperationalVehicles,
          ...operationalVehicles,
          undefined,
          false,
        ]),
      ).to.deep.equal(operationalVehicles);
    },
  );
});

describe(VehicleService.takeOnlyOperational.name, () => {
  it(`should throw ${TypeError.name} if passed argument is not array`, () => {
    cy.testException(() => VehicleService.takeOnlyUnavailable('foobar')).then(
      (exception) => {
        exception().should('be.instanceOf', TypeError);
        exception().should(
          'have.property',
          'message',
          'Argument "data" should be array, received: string.',
        );
      },
    );

    cy.testException(() =>
      VehicleService.takeOnlyUnavailable({ foo: 'bar' }),
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
    expect(VehicleService.takeOnlyUnavailable([])).to.deep.equal([]);
  });

  specify('given garbage data it should return empty array', () => {
    expect(VehicleService.takeOnlyUnavailable(garbageData)).to.deep.equal([]);
  });

  specify(
    `given different subclasses of ${BaseVehicle.name} but no ${UnavailableVehicle.name} it should return empty array`,
    () => {
      expect(
        VehicleService.takeOnlyUnavailable(vehiclesWithoutUnavailableVehicles),
      ).to.deep.equal([]);
    },
  );

  specify(
    `given mix of valid and invalid data it should return valid data`,
    () => {
      expect(
        VehicleService.takeOnlyUnavailable([
          ...vehiclesWithoutUnavailableVehicles,
          ...unavailableVehicles,
          undefined,
          false,
        ]),
      ).to.deep.equal(unavailableVehicles);
    },
  );
});
