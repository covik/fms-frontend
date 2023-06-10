import { ZodError } from 'zod';
import { BaseVehicle } from '.';
import { baseVehicleAttrs } from '../../../cypress/fixtures/base-and-located-vehicle-attributes';
import type { BaseVehicleAttributes } from './BaseVehicle';

const id = '1234';
const name = 'Test';
const imei = '4321';
const emptyValue = '  ';

class MockBaseVehicle extends BaseVehicle {}

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
