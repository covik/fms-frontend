import { ZodError } from 'zod';
import { BaseVehicle } from '.';
import { baseVehicleAttrs } from '../../../cypress/fixtures/base-and-located-vehicle-attributes';
import type { BaseVehicleAttributes } from './BaseVehicle';

const id = '1234';
const name = 'Test';
const imei = '4321';
const emptyValue = '  ';

const validVehicle = new BaseVehicle(baseVehicleAttrs);

const problematicSituations = [
  {
    title: 'no property is provided',
    construct: () => new BaseVehicle({} as BaseVehicleAttributes),
  },
  {
    title: 'id is missing',
    construct: () =>
      new BaseVehicle({
        imei,
        name,
      } as BaseVehicleAttributes),
  },
  {
    title: 'name is missing',
    construct: () =>
      new BaseVehicle({
        id,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'imei is missing',
    construct: () =>
      new BaseVehicle({
        id,
        name,
      } as BaseVehicleAttributes),
  },
  {
    title: 'id is empty',
    construct: () =>
      new BaseVehicle({
        id: emptyValue,
        name,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'name is empty',
    construct: () =>
      new BaseVehicle({
        id,
        name: emptyValue,
        imei,
      } as BaseVehicleAttributes),
  },
  {
    title: 'imei is empty',
    construct: () =>
      new BaseVehicle({
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
  expect(validVehicle.id()).to.equal(id);
  expect(validVehicle.name()).to.equal(name);
  expect(validVehicle.imei()).to.equal(imei);
});
