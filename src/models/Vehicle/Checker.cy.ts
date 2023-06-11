import {
  BaseVehicle,
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isUnavailableVehicle,
  isVehicleWithoutPosition,
  DisabledVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  UnavailableVehicle,
} from '.';
import {
  createBaseVehicleMock,
  createDisabledVehicle,
  createOperationalVehicle,
  createUnavailableVehicle,
  createVehicleWithoutPosition,
} from './factory';

const baseVehicle = createBaseVehicleMock();
const operationalVehicle = createOperationalVehicle();
const unavailableVehicle = createUnavailableVehicle();
const disabledVehicle = createDisabledVehicle();
const noPositionVehicle = createVehicleWithoutPosition();

describe(isBaseVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isBaseVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return true`, () => {
    expect(isBaseVehicle(baseVehicle)).to.equal(true);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    expect(isBaseVehicle(operationalVehicle)).to.equal(true);
  });

  specify(`given ${UnavailableVehicle.name} it should return true`, () => {
    expect(isBaseVehicle(unavailableVehicle)).to.equal(true);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    expect(isBaseVehicle(disabledVehicle)).to.equal(true);
  });

  specify(`given ${NoPositionVehicle.name} it should return true`, () => {
    expect(isBaseVehicle(noPositionVehicle)).to.equal(true);
  });
});

describe(isOperationalVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isOperationalVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    expect(isOperationalVehicle(baseVehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    expect(isOperationalVehicle(unavailableVehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    expect(isOperationalVehicle(disabledVehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    expect(isOperationalVehicle(noPositionVehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    expect(isOperationalVehicle(operationalVehicle)).to.equal(true);
  });
});

describe(isUnavailableVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isUnavailableVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    expect(isUnavailableVehicle(baseVehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    expect(isUnavailableVehicle(operationalVehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    expect(isUnavailableVehicle(disabledVehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    expect(isUnavailableVehicle(noPositionVehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return true`, () => {
    expect(isUnavailableVehicle(unavailableVehicle)).to.equal(true);
  });
});

describe(isDisabledVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isDisabledVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    expect(isDisabledVehicle(baseVehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    expect(isDisabledVehicle(operationalVehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    expect(isDisabledVehicle(unavailableVehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    expect(isDisabledVehicle(noPositionVehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    expect(isDisabledVehicle(disabledVehicle)).to.equal(true);
  });
});

describe(isVehicleWithoutPosition.name, () => {
  specify('given null it should return false', () => {
    expect(isVehicleWithoutPosition(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    expect(isVehicleWithoutPosition(baseVehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    expect(isVehicleWithoutPosition(operationalVehicle)).to.equal(false);
  });

  specify(`given ${UnavailableVehicle.name} it should return false`, () => {
    expect(isVehicleWithoutPosition(unavailableVehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    expect(isVehicleWithoutPosition(disabledVehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    expect(isVehicleWithoutPosition(noPositionVehicle)).to.equal(true);
  });
});
