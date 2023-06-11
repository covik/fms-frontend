import {
  BaseVehicle,
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isTimedOutVehicle,
  isVehicleWithoutPosition,
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '.';
import {
  baseVehicleAttrs,
  locatedVehicleAttributes,
} from '../../../cypress/fixtures/base-and-located-vehicle-attributes';

class MockBaseVehicle extends BaseVehicle {}

describe(isBaseVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isBaseVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return true`, () => {
    const vehicle = new MockBaseVehicle(baseVehicleAttrs);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${UnavailableVehicle.name} it should return true`, () => {
    const vehicle = new UnavailableVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${NoPositionVehicle.name} it should return true`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });
});

describe(isOperationalVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isOperationalVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new MockBaseVehicle(baseVehicleAttrs);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    const vehicle = new UnavailableVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(true);
  });
});

describe(isTimedOutVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isTimedOutVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new MockBaseVehicle(baseVehicleAttrs);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return true`, () => {
    const vehicle = new UnavailableVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(true);
  });
});

describe(isDisabledVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isDisabledVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new MockBaseVehicle(baseVehicleAttrs);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    const vehicle = new UnavailableVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(true);
  });
});

describe(isVehicleWithoutPosition.name, () => {
  specify('given null it should return false', () => {
    expect(isVehicleWithoutPosition(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new MockBaseVehicle(baseVehicleAttrs);
    expect(isVehicleWithoutPosition(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isVehicleWithoutPosition(vehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    const vehicle = new UnavailableVehicle(locatedVehicleAttributes);
    expect(isVehicleWithoutPosition(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isVehicleWithoutPosition(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isVehicleWithoutPosition(vehicle)).to.equal(true);
  });
});
