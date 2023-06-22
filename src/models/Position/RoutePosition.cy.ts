import { ZodError } from 'zod';
import { RoutePosition, Position, PositionTimestamps } from './';
import { Coordinates } from '../../lib/Dimension';
import { Angle, Length, Speed, Voltage } from '../../lib/MeasurementUnit';
import type { RoutePositionAttributes } from './';

const id = '1234';
const coordinates = new Coordinates(45, 45);
const altitude = 15;
const timestamps = new PositionTimestamps(
  new Date('2020-01-01T12:00:00Z'),
  new Date('2020-01-01T12:00:00Z'),
  new Date('2020-01-01T12:00:05Z'),
);
const speed = new Speed.Knots(10);
const heading = new Angle.Degree(15);
const inMotion = true;
const power = new Voltage.Volt(12.52);
const mileage = new Length.Meter(120258);
const distance = new Length.Meter(1020);

const routePositionAttributes = {
  id,
  coordinates,
  altitude,
  timestamps,
  speed,
  heading,
  inMotion,
  power,
  mileage,
  distance,
};

describe(RoutePosition.name, () => {
  it(`should extend ${Position.name}`, () => {
    const routePosition = new RoutePosition(routePositionAttributes);
    expect(routePosition).to.be.instanceOf(Position);
  });

  const problematicSituations = [
    [
      'speed is missing',
      () => {
        const { speed, ...attributesWithoutSpeed } = routePositionAttributes;
        return attributesWithoutSpeed;
      },
    ],
    [
      'speed is not BaseSpeed object',
      () => ({
        ...routePositionAttributes,
        speed: 'I reject being BaseSpeed object',
      }),
    ],
    [
      'heading is missing',
      () => {
        const { heading, ...attributesWithoutHeading } =
          routePositionAttributes;
        return attributesWithoutHeading;
      },
    ],
    [
      'heading is not BaseAngle object',
      () => ({
        ...routePositionAttributes,
        heading: 'I reject being BaseAngle object',
      }),
    ],
    [
      'inMotion is missing',
      () => {
        const { inMotion, ...attributesWithoutMotion } =
          routePositionAttributes;
        return attributesWithoutMotion;
      },
    ],
    [
      'inMotion is not boolean',
      () => ({
        ...routePositionAttributes,
        inMotion: 'I reject being boolean',
      }),
    ],
    [
      'power is missing',
      () => {
        const { power, ...attributesWithoutPower } = routePositionAttributes;
        return attributesWithoutPower;
      },
    ],
    [
      'power is negative number',
      () => ({
        ...routePositionAttributes,
        power: -1,
      }),
    ],
    [
      'mileage is missing',
      () => {
        const { mileage, ...attributesWithoutOdometer } =
          routePositionAttributes;
        return attributesWithoutOdometer;
      },
    ],
    [
      'mileage is not BaseLength',
      () => ({
        ...routePositionAttributes,
        mileage: 'I reject being BaseLength',
      }),
    ],
    [
      'distance is missing',
      () => {
        const { distance, ...attributesWithoutDistance } =
          routePositionAttributes;
        return attributesWithoutDistance;
      },
    ],
    [
      'distance is not BaseLength',
      () => ({
        ...routePositionAttributes,
        distance: 'I reject being BaseLength',
      }),
    ],
  ] as const;

  problematicSituations.forEach(([title, attributes]) => {
    it(`should throw exception if - ${title}`, () => {
      cy.testException(() => factory(attributes())).then((error) => {
        error().should('be.instanceOf', ZodError);
      });
    });
  });

  it('should return passed arguments through getters', () => {
    const position = factory(routePositionAttributes);

    expect(position.id()).to.string(id);
    expect(position.latitude()).to.equal(coordinates.latitude());
    expect(position.longitude()).to.equal(coordinates.longitude());
    expect(position.coordinates()).to.equal(coordinates);
    expect(position.altitude()).to.equal(altitude);
    expect(position.timestamp()).to.equal(timestamps);
    expect(position.speed()).to.equal(speed);
    expect(position.heading()).to.equal(heading);
    expect(position.inMotion()).to.equal(inMotion);
    expect(position.power()).to.equal(power);
    expect(position.mileage()).to.equal(mileage);
    expect(position.distance()).to.equal(distance);
  });
});

function factory(attributes: unknown) {
  return new RoutePosition(attributes as RoutePositionAttributes);
}
