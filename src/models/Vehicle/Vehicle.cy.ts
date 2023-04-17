import { BaseVehicle, InvalidVehicleAttribute, LocatedVehicle } from './';
import type { BaseVehicleAttributes, LocatedVehicleAttributes } from './';
import { Position, PositionTimestamps } from '../Position';
import { Angle, Speed } from '../../lib/MeasurementUnit';
import { Coordinates } from '../../lib/Dimension';

const baseVehicleAttrs = { id: '1234', name: 'Test', imei: '4321' };

describe(BaseVehicle.name, () => {
  const id = '1234';
  const name = 'Test';
  const imei = '4321';
  const emptyValue = '  ';

  const validVehicle = new BaseVehicle(baseVehicleAttrs);

  const problematicSituations = [
    {
      title: 'no property is provided',
      construct: () => new BaseVehicle({} as BaseVehicleAttributes),
      expectedMessage: `Zero properties passed to constructor.`,
    },
    {
      title: 'id is missing',
      construct: () =>
        new BaseVehicle({
          imei,
          name,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "id" not passed to constructor.`,
    },
    {
      title: 'name is missing',
      construct: () =>
        new BaseVehicle({
          id,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "name" not passed to constructor.`,
    },
    {
      title: 'imei is missing',
      construct: () =>
        new BaseVehicle({
          id,
          name,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "imei" not passed to constructor.`,
    },
    {
      title: 'id is empty',
      construct: () =>
        new BaseVehicle({
          id: emptyValue,
          name,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "id" must not be empty string.`,
    },
    {
      title: 'name is empty',
      construct: () =>
        new BaseVehicle({
          id,
          name: emptyValue,
          imei,
        } as BaseVehicleAttributes),
      expectedMessage: `Property "name" must not be empty string.`,
    },
    {
      title: 'imei is empty',
      construct: () =>
        new BaseVehicle({
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
});

describe(LocatedVehicle.name, () => {
  const position = new Position({
    id: '1',
    coordinates: new Coordinates(45.501, 15.224),
    altitude: 10,
    timestamps: new PositionTimestamps(
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:05Z'),
    ),
  });

  const correctVehicleAttributes = {
    ...baseVehicleAttrs,
    position,
    course: new Angle.Degree(10),
    speed: new Speed.KPH(40),
    online: false,
    ignitionOn: false,
    inMotion: false,
  };

  specify('should extend BaseVehicle', () => {
    expect(new LocatedVehicle(correctVehicleAttributes)).to.be.instanceOf(
      BaseVehicle,
    );
  });

  const problematicSituations = [
    {
      title: 'position is missing',
      construct: () => {
        const { position, ...attributesWithoutPosition } =
          correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutPosition as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "position" not passed to constructor.',
    },
    {
      title: 'course is missing',
      construct: () => {
        const { course, ...attributesWithoutCourse } = correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutCourse as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "course" not passed to constructor.',
    },
    {
      title: 'speed is missing',
      construct: () => {
        const { speed, ...attributesWithoutSpeed } = correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutSpeed as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "speed" not passed to constructor.',
    },
    {
      title: 'online is missing',
      construct: () => {
        const { online, ...attributesWithoutOnline } = correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutOnline as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "online" not passed to constructor.',
    },
    {
      title: 'ignitionOn is missing',
      construct: () => {
        const { ignitionOn, ...attributesWithoutIgnitionOn } =
          correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutIgnitionOn as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "ignitionOn" not passed to constructor.',
    },
    {
      title: 'inMotion is missing',
      construct: () => {
        const { inMotion, ...attributesWithoutInMotion } =
          correctVehicleAttributes;

        return new LocatedVehicle(
          attributesWithoutInMotion as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "inMotion" not passed to constructor.',
    },
    {
      title: 'position is not Position object',
      construct: () => {
        const attributesWithIncorrectPosition = {
          ...correctVehicleAttributes,
          position: 'I reject being Position object',
        };

        return new LocatedVehicle(
          attributesWithIncorrectPosition as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage:
        'Property "position" must be Position object. Got string.',
    },
    {
      title: 'course is not BaseAngle object',
      construct: () => {
        const attributesWithIncorrectCourse = {
          ...correctVehicleAttributes,
          course: 'I reject being BaseAngle object',
        };

        return new LocatedVehicle(
          attributesWithIncorrectCourse as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage:
        'Property "course" must be BaseAngle object. Got string.',
    },
    {
      title: 'speed is not BaseSpeed object',
      construct: () => {
        const attributesWithIncorrectSpeed = {
          ...correctVehicleAttributes,
          speed: 'I reject being BaseSpeed object',
        };

        return new LocatedVehicle(
          attributesWithIncorrectSpeed as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "speed" must be BaseSpeed object. Got string.',
    },
    {
      title: 'online is not boolean',
      construct: () => {
        const attributesWithIncorrectOnline = {
          ...correctVehicleAttributes,
          online: undefined,
        };

        return new LocatedVehicle(
          attributesWithIncorrectOnline as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "online" must be boolean. Got undefined.',
    },
    {
      title: 'ignitionOn is not boolean',
      construct: () => {
        const attributesWithIncorrectIgnitionOn = {
          ...correctVehicleAttributes,
          ignitionOn: undefined,
        };

        return new LocatedVehicle(
          attributesWithIncorrectIgnitionOn as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "ignitionOn" must be boolean. Got undefined.',
    },
    {
      title: 'inMotion is not boolean',
      construct: () => {
        const attributesWithIncorrectInMotion = {
          ...correctVehicleAttributes,
          inMotion: undefined,
        };

        return new LocatedVehicle(
          attributesWithIncorrectInMotion as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "inMotion" must be boolean. Got undefined.',
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
    const validVehicle = new LocatedVehicle(correctVehicleAttributes);

    expect(validVehicle.id()).to.equal(correctVehicleAttributes.id);
    expect(validVehicle.name()).to.equal(correctVehicleAttributes.name);
    expect(validVehicle.imei()).to.equal(correctVehicleAttributes.imei);
    expect(validVehicle.position()).to.equal(correctVehicleAttributes.position);
    expect(validVehicle.course()).to.equal(correctVehicleAttributes.course);
    expect(validVehicle.speed()).to.equal(correctVehicleAttributes.speed);
    expect(validVehicle.isOnline()).to.equal(correctVehicleAttributes.online);
    expect(validVehicle.hasIgnitionTurnedOn()).to.equal(
      correctVehicleAttributes.ignitionOn,
    );
    expect(validVehicle.isInMotion()).to.equal(
      correctVehicleAttributes.inMotion,
    );
    expect(validVehicle.lastUpdatedAt()).to.equal(
      correctVehicleAttributes.position.timestamp().fixationTime(),
    );
  });
});
