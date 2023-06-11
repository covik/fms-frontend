import { faker } from '@faker-js/faker';
import { ZodError } from 'zod';
import { BaseVehicle } from '.';
import { createBaseVehicleAttributes } from './factory';
import type { BaseVehicleAttributes } from './BaseVehicle';

class MockBaseVehicle extends BaseVehicle {}
const baseVehicleAttrs = createBaseVehicleAttributes(faker);
const { id, name, imei } = baseVehicleAttrs;
const emptyValue = '  ';

const problematicSituations = [
  {
    title: 'no property is provided',
    construct: () => new MockBaseVehicle({} as BaseVehicleAttributes),
  },
  {
    title: 'id is missing',
    construct: () =>
      new MockBaseVehicle({
        imei,
        name,
      } as BaseVehicleAttributes),
  },
  {
    title: 'name is missing',
    construct: () =>
      new MockBaseVehicle({
        id,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'imei is missing',
    construct: () =>
      new MockBaseVehicle({
        id,
        name,
      } as BaseVehicleAttributes),
  },
  {
    title: 'id is empty',
    construct: () =>
      new MockBaseVehicle({
        id: emptyValue,
        name,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'name is empty',
    construct: () =>
      new MockBaseVehicle({
        id,
        name: emptyValue,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'imei is empty',
    construct: () =>
      new MockBaseVehicle({
        id,
        name,
        imei: emptyValue,
      } as BaseVehicleAttributes),
  },
];

problematicSituations.forEach((situation) => {
  it(`should throw exception if - ${situation.title}`, () => {
    cy.testException(() => situation.construct()).then((error) => {
      error().should('be.instanceOf', ZodError);
    });
  });
});

it('should return passed arguments through getters', () => {
  const validVehicle = new MockBaseVehicle(baseVehicleAttrs);

  expect(validVehicle.id()).to.equal(id);
  expect(validVehicle.name()).to.equal(name);
  expect(validVehicle.imei()).to.equal(imei);
});
