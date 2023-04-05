import { BaseVehicle, InvalidVehicleAttribute } from './';
import type { BaseVehicleAttributes } from './';

describe(BaseVehicle.name, () => {
  useBaseVehicleTests(
    BaseVehicle,
    new BaseVehicle({ id: '1234', name: 'Test', imei: '4321' }),
  );
});

function useBaseVehicleTests(
  VehicleVariant: typeof BaseVehicle,
  validVehicle: BaseVehicle,
) {
  const id = '1234';
  const name = 'Test';
  const imei = '4321';
  const emptyValue = '  ';

  const problematicSituations = [
    {
      title: 'no property is provided',
      construct: () => new VehicleVariant({} as BaseVehicleAttributes),
      expectedMessage: `Zero properties passed to constructor.`,
    },
    {
      title: 'id is missing',
      construct: () =>
        new VehicleVariant({
          imei,
          name,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "id" not passed to constructor.`,
    },
    {
      title: 'name is missing',
      construct: () =>
        new VehicleVariant({
          id,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "name" not passed to constructor.`,
    },
    {
      title: 'imei is missing',
      construct: () =>
        new VehicleVariant({
          id,
          name,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "imei" not passed to constructor.`,
    },
    {
      title: 'id is empty',
      construct: () =>
        new VehicleVariant({
          id: emptyValue,
          name,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "id" must not be empty string.`,
    },
    {
      title: 'name is empty',
      construct: () =>
        new VehicleVariant({
          id,
          name: emptyValue,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "name" must not be empty string.`,
    },
    {
      title: 'imei is empty',
      construct: () =>
        new VehicleVariant({
          id,
          name,
          imei: emptyValue,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "imei" must not be empty string.`,
    },
  ];

  problematicSituations.forEach((situation) => {
    it(`should throw exception if - ${situation.title}`, () => {
      cy.testException(async () => situation.construct()).then((error) => {
        error().should('be.instanceOf', InvalidVehicleAttribute);
        error().should('have.a.property', 'message', situation.expectedMessage);
      });
    });
  });

  it('should return passed arguments through getters', () => {
    expect(validVehicle.id()).to.equal(id);
    expect(validVehicle.name()).to.equal(name);
    expect(validVehicle.imei()).to.equal(imei);
  });
}
