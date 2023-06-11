import {
  DisabledVehicle,
  LocatedVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  ProblematicLocatedVehicle,
  ProblematicVehicle,
  UnavailableVehicle,
} from './';
import {
  baseVehicleAttrs,
  locatedVehicleAttributes,
} from '../../../cypress/fixtures/base-and-located-vehicle-attributes';

describe(OperationalVehicle.name, () => {
  specify(`should extend ${LocatedVehicle.name}`, () => {
    expect(new OperationalVehicle(locatedVehicleAttributes)).to.be.instanceOf(
      LocatedVehicle,
    );
  });
});

describe(DisabledVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(new DisabledVehicle(locatedVehicleAttributes)).to.be.instanceOf(
      ProblematicLocatedVehicle,
    );
  });
});

describe(UnavailableVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(new UnavailableVehicle(locatedVehicleAttributes)).to.be.instanceOf(
      ProblematicLocatedVehicle,
    );
  });
});

describe(NoPositionVehicle.name, () => {
  it(`should extend ${ProblematicVehicle.name}`, () => {
    expect(new NoPositionVehicle(baseVehicleAttrs)).to.be.instanceOf(
      ProblematicVehicle,
    );
  });
});
