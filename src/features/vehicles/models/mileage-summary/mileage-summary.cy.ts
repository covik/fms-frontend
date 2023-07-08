import { faker } from '@faker-js/faker';
import { ZodError } from 'zod';
import { MileageSummary } from '.';
import { Length } from '../../../../lib/measurement-unit';
import type { MileageSummaryAttributes } from '.';

const vehicleId = faker.string.uuid();
const vehicleName = faker.vehicle.vrm();
const mileage = new Length.Meter(faker.number.int({ min: 5000, max: 12000 }));
const odometer = new Length.Meter(
  faker.number.int({ min: 100_000, max: 250_000 }),
);
const mileageSummary = {
  vehicleId,
  vehicleName,
  mileage,
  odometer,
} as MileageSummaryAttributes;

const problematicSituations = {
  'vehicleId is missing': () => {
    const { vehicleId, ...attributesWithoutVehicleId } = mileageSummary;
    return attributesWithoutVehicleId;
  },
  'vehicleId is not string': () => ({ ...mileageSummary, vehicleId: NaN }),
  'vehicleName is missing': () => {
    const { vehicleName, ...attributesWithoutVehicleName } = mileageSummary;
    return attributesWithoutVehicleName;
  },
  'vehicleName is not string': () => ({ ...mileageSummary, vehicleId: NaN }),
  'mileage is missing': () => {
    const { mileage, ...attributesWithoutMileage } = mileageSummary;
    return attributesWithoutMileage;
  },
  [`mileage is not ${Length.BaseLength.name} object`]: () => ({
    ...mileageSummary,
    mileage: `I refuse to be ${Length.BaseLength.name} object`,
  }),
  'odometer is missing': () => {
    const { odometer, ...attributesWithoutOdometer } = mileageSummary;
    return attributesWithoutOdometer;
  },
  [`odometer is not ${Length.BaseLength.name} object`]: () => ({
    ...mileageSummary,
    odometer: `I refuse to be ${Length.BaseLength.name} object`,
  }),
};

Object.entries(problematicSituations).forEach(([title, situation]) => {
  it(`should throw exception if - ${title}`, () => {
    cy.testException(
      () => new MileageSummary(situation() as MileageSummaryAttributes),
    ).then((error) => {
      error().should('be.instanceOf', ZodError);
    });
  });
});

it('should return passed arguments through getters', () => {
  const summary = new MileageSummary(mileageSummary);

  expect(summary.vehicleId()).to.equal(mileageSummary.vehicleId);
  expect(summary.vehicleName()).to.equal(mileageSummary.vehicleName);
  expect(summary.mileage()).to.equal(mileageSummary.mileage);
  expect(summary.odometer()).to.equal(mileageSummary.odometer);
});
