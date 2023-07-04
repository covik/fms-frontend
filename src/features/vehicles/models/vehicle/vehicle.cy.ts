import {
  DisabledVehicle,
  LocatedVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  ProblematicLocatedVehicle,
  ProblematicVehicle,
  UnavailableVehicle,
} from '.';
import {
  createDisabledVehicle,
  createOperationalVehicle,
  createUnavailableVehicle,
  createVehicleWithoutPosition,
} from './factory';

const operationalVehicle = createOperationalVehicle();
const unavailableVehicle = createUnavailableVehicle();
const disabledVehicle = createDisabledVehicle();
const noPositionVehicle = createVehicleWithoutPosition();

describe(OperationalVehicle.name, () => {
  specify(`should extend ${LocatedVehicle.name}`, () => {
    expect(operationalVehicle).to.be.instanceOf(LocatedVehicle);
  });
});

describe(DisabledVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(disabledVehicle).to.be.instanceOf(ProblematicLocatedVehicle);
  });
});

describe(UnavailableVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(unavailableVehicle).to.be.instanceOf(ProblematicLocatedVehicle);
  });
});

describe(NoPositionVehicle.name, () => {
  it(`should extend ${ProblematicVehicle.name}`, () => {
    expect(noPositionVehicle).to.be.instanceOf(ProblematicVehicle);
  });
});
