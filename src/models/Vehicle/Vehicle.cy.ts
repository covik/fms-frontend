import {
  BaseVehicle,
  DisabledVehicle,
  InvalidVehicleAttribute,
  isBaseVehicle,
  isDisabledVehicle,
  isOperationalVehicle,
  isTimedOutVehicle,
  LocatedVehicle,
  NoPositionVehicle,
  OperationalVehicle,
  ProblematicLocatedVehicle,
  ProblematicVehicle,
  TimedOutVehicle,
} from './';
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

const locatedVehicleAttributes = {
  ...baseVehicleAttrs,
  position: new Position({
    id: '1',
    coordinates: new Coordinates(45.501, 15.224),
    altitude: 10,
    timestamps: new PositionTimestamps(
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-01T12:00:05Z'),
    ),
  }),
  course: new Angle.Degree(10),
  speed: new Speed.KPH(40),
  online: false,
  ignitionOn: false,
  inMotion: false,
};

describe(OperationalVehicle.name, () => {
  specify(`should extend ${LocatedVehicle.name}`, () => {
    expect(new OperationalVehicle(locatedVehicleAttributes)).to.be.instanceOf(
      LocatedVehicle,
    );
  });

  const problematicSituations = [
    {
      title: 'position is missing',
      construct: () => {
        const { position, ...attributesWithoutPosition } =
          locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutPosition as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "position" not passed to constructor.',
    },
    {
      title: 'course is missing',
      construct: () => {
        const { course, ...attributesWithoutCourse } = locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutCourse as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "course" not passed to constructor.',
    },
    {
      title: 'speed is missing',
      construct: () => {
        const { speed, ...attributesWithoutSpeed } = locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutSpeed as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "speed" not passed to constructor.',
    },
    {
      title: 'online is missing',
      construct: () => {
        const { online, ...attributesWithoutOnline } = locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutOnline as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "online" not passed to constructor.',
    },
    {
      title: 'ignitionOn is missing',
      construct: () => {
        const { ignitionOn, ...attributesWithoutIgnitionOn } =
          locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutIgnitionOn as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "ignitionOn" not passed to constructor.',
    },
    {
      title: 'inMotion is missing',
      construct: () => {
        const { inMotion, ...attributesWithoutInMotion } =
          locatedVehicleAttributes;

        return new OperationalVehicle(
          attributesWithoutInMotion as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "inMotion" not passed to constructor.',
    },
    {
      title: 'position is not Position object',
      construct: () => {
        const attributesWithIncorrectPosition = {
          ...locatedVehicleAttributes,
          position: 'I reject being Position object',
        };

        return new OperationalVehicle(
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
          ...locatedVehicleAttributes,
          course: 'I reject being BaseAngle object',
        };

        return new OperationalVehicle(
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
          ...locatedVehicleAttributes,
          speed: 'I reject being BaseSpeed object',
        };

        return new OperationalVehicle(
          attributesWithIncorrectSpeed as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "speed" must be BaseSpeed object. Got string.',
    },
    {
      title: 'online is not boolean',
      construct: () => {
        const attributesWithIncorrectOnline = {
          ...locatedVehicleAttributes,
          online: undefined,
        };

        return new OperationalVehicle(
          attributesWithIncorrectOnline as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "online" must be boolean. Got undefined.',
    },
    {
      title: 'ignitionOn is not boolean',
      construct: () => {
        const attributesWithIncorrectIgnitionOn = {
          ...locatedVehicleAttributes,
          ignitionOn: undefined,
        };

        return new OperationalVehicle(
          attributesWithIncorrectIgnitionOn as unknown as LocatedVehicleAttributes,
        );
      },
      expectedMessage: 'Property "ignitionOn" must be boolean. Got undefined.',
    },
    {
      title: 'inMotion is not boolean',
      construct: () => {
        const attributesWithIncorrectInMotion = {
          ...locatedVehicleAttributes,
          inMotion: undefined,
        };

        return new OperationalVehicle(
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
    const validVehicle = new OperationalVehicle(locatedVehicleAttributes);

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
    expect(validVehicle.isInMotion()).to.equal(
      locatedVehicleAttributes.inMotion,
    );
    expect(validVehicle.lastUpdatedAt()).to.equal(
      locatedVehicleAttributes.position.timestamp().fixationTime(),
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

describe(TimedOutVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(new TimedOutVehicle(locatedVehicleAttributes)).to.be.instanceOf(
      ProblematicLocatedVehicle,
    );
  });
});

describe(NoPositionVehicle.name, () => {
  it(`should extend ${ProblematicLocatedVehicle.name}`, () => {
    expect(new NoPositionVehicle(baseVehicleAttrs)).to.be.instanceOf(
      ProblematicVehicle,
    );
  });
});

describe(isBaseVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isBaseVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return true`, () => {
    const vehicle = new BaseVehicle(baseVehicleAttrs);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${TimedOutVehicle.name} it should return true`, () => {
    const vehicle = new TimedOutVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });

  specify(`given ${NoPositionVehicle.name} it should return true`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isBaseVehicle(vehicle)).to.equal(true);
  });
});

describe(isOperationalVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isOperationalVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new BaseVehicle(baseVehicleAttrs);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${TimedOutVehicle.name} it should return false`, () => {
    const vehicle = new TimedOutVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isOperationalVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return true`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isOperationalVehicle(vehicle)).to.equal(true);
  });
});

describe(isTimedOutVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isTimedOutVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new BaseVehicle(baseVehicleAttrs);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return false`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isTimedOutVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${TimedOutVehicle.name} it should return true`, () => {
    const vehicle = new TimedOutVehicle(locatedVehicleAttributes);
    expect(isTimedOutVehicle(vehicle)).to.equal(true);
  });
});

describe(isDisabledVehicle.name, () => {
  specify('given null it should return false', () => {
    expect(isDisabledVehicle(null)).to.equal(false);
  });

  specify(`given ${BaseVehicle.name} it should return false`, () => {
    const vehicle = new BaseVehicle(baseVehicleAttrs);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${OperationalVehicle.name} it should return false`, () => {
    const vehicle = new OperationalVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${TimedOutVehicle.name} it should return false`, () => {
    const vehicle = new TimedOutVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${NoPositionVehicle.name} it should return false`, () => {
    const vehicle = new NoPositionVehicle(baseVehicleAttrs);
    expect(isDisabledVehicle(vehicle)).to.equal(false);
  });

  specify(`given ${DisabledVehicle.name} it should return true`, () => {
    const vehicle = new DisabledVehicle(locatedVehicleAttributes);
    expect(isDisabledVehicle(vehicle)).to.equal(true);
  });
});
