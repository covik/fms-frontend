import { faker } from '@faker-js/faker';
import { ZodError } from 'zod';
import { createLocatedVehicleAttributes } from './factory';
import { LocatedVehicle } from './LocatedVehicle';
import type { LocatedVehicleAttributes } from './LocatedVehicle';

class MockLocatedVehicle extends LocatedVehicle {}
const locatedVehicleAttributes = createLocatedVehicleAttributes(faker);

const problematicSituations = [
  {
    title: 'position is missing',
    construct: () => {
      const { position, ...attributesWithoutPosition } =
        locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutPosition as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'course is missing',
    construct: () => {
      const { course, ...attributesWithoutCourse } = locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutCourse as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'speed is missing',
    construct: () => {
      const { speed, ...attributesWithoutSpeed } = locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutSpeed as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'online is missing',
    construct: () => {
      const { online, ...attributesWithoutOnline } = locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutOnline as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'ignitionOn is missing',
    construct: () => {
      const { ignitionOn, ...attributesWithoutIgnitionOn } =
        locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutIgnitionOn as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'inMotion is missing',
    construct: () => {
      const { inMotion, ...attributesWithoutInMotion } =
        locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutInMotion as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'mileage is missing',
    construct: () => {
      const { mileage, ...attributesWithoutMileage } = locatedVehicleAttributes;

      return new MockLocatedVehicle(
        attributesWithoutMileage as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'position is not Position object',
    construct: () => {
      const attributesWithIncorrectPosition = {
        ...locatedVehicleAttributes,
        position: 'I reject being Position object',
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectPosition as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'course is not BaseAngle object',
    construct: () => {
      const attributesWithIncorrectCourse = {
        ...locatedVehicleAttributes,
        course: 'I reject being BaseAngle object',
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectCourse as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'speed is not BaseSpeed object',
    construct: () => {
      const attributesWithIncorrectSpeed = {
        ...locatedVehicleAttributes,
        speed: 'I reject being BaseSpeed object',
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectSpeed as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'online is not boolean',
    construct: () => {
      const attributesWithIncorrectOnline = {
        ...locatedVehicleAttributes,
        online: undefined,
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectOnline as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'ignitionOn is not boolean',
    construct: () => {
      const attributesWithIncorrectIgnitionOn = {
        ...locatedVehicleAttributes,
        ignitionOn: undefined,
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectIgnitionOn as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'inMotion is not boolean',
    construct: () => {
      const attributesWithIncorrectInMotion = {
        ...locatedVehicleAttributes,
        inMotion: undefined,
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectInMotion as unknown as LocatedVehicleAttributes,
      );
    },
  },
  {
    title: 'mileage is not BaseLength object',
    construct: () => {
      const attributesWithIncorrectMileage = {
        ...locatedVehicleAttributes,
        mileage: 'I reject being BaseLength object',
      };

      return new MockLocatedVehicle(
        attributesWithIncorrectMileage as unknown as LocatedVehicleAttributes,
      );
    },
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
  const validVehicle = new MockLocatedVehicle(locatedVehicleAttributes);

  expect(validVehicle.id()).to.equal(locatedVehicleAttributes.id);
  expect(validVehicle.name()).to.equal(locatedVehicleAttributes.name);
  expect(validVehicle.imei()).to.equal(locatedVehicleAttributes.imei);
  expect(validVehicle.position()).to.equal(locatedVehicleAttributes.position);
  expect(validVehicle.course()).to.equal(locatedVehicleAttributes.course);
  expect(validVehicle.speed()).to.equal(locatedVehicleAttributes.speed);
  expect(validVehicle.isOnline()).to.equal(locatedVehicleAttributes.online);
  expect(validVehicle.hasIgnitionTurnedOn()).to.equal(
    locatedVehicleAttributes.ignitionOn,
  );
  expect(validVehicle.isInMotion()).to.equal(locatedVehicleAttributes.inMotion);
  expect(validVehicle.lastUpdatedAt()).to.equal(
    locatedVehicleAttributes.position.timestamp().fixationTime(),
  );
  expect(validVehicle.mileage()).to.equal(locatedVehicleAttributes.mileage);
});
