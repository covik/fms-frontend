import { InvalidPositionAttribute, Position, PositionTimestamps } from './';
import type { PositionAttributes } from './';
import { Coordinates } from '../../lib/Dimension';

describe(Position.name, () => {
  const id = '1234';
  const coordinates = new Coordinates(45, 45);
  const altitude = 15;
  const timestamps = new PositionTimestamps(
    new Date('2020-01-01T12:00:00Z'),
    new Date('2020-01-01T12:00:00Z'),
    new Date('2020-01-01T12:00:05Z'),
  );

  const problematicSituations = [
    {
      title: 'no property is provided',
      construct: () => new Position({} as PositionAttributes),
      expectedMessage: 'Zero properties passed to constructor.',
    },
    {
      title: 'id is missing',
      construct: () =>
        new Position({
          coordinates,
          altitude,
          timestamps,
        } as PositionAttributes),
      expectedMessage: 'Property "id" is not passed to constructor.',
    },
    {
      title: 'coordinates is missing',
      construct: () =>
        new Position({ id, altitude, timestamps } as PositionAttributes),
      expectedMessage: 'Property "coordinates" is not passed to constructor.',
    },
    {
      title: 'altitude is missing',
      construct: () =>
        new Position({ id, coordinates, timestamps } as PositionAttributes),
      expectedMessage: 'Property "altitude" is not passed to constructor.',
    },
    {
      title: 'timestamps is missing',
      construct: () =>
        new Position({
          id,
          coordinates,
          altitude,
        } as PositionAttributes),
      expectedMessage: 'Property "timestamps" is not passed to constructor.',
    },
    {
      title: 'id is empty',
      construct: () =>
        new Position({
          id: '  ',
          coordinates,
          altitude,
          timestamps,
        } as PositionAttributes),
      expectedMessage: 'Property "id" must not be empty string.',
    },
    {
      title: 'coordinates is not Coordinates object',
      construct: () =>
        new Position({
          id,
          coordinates: 'aaa',
          altitude,
          timestamps,
        } as unknown as PositionAttributes),
      expectedMessage:
        'Property "coordinates" must be Coordinates object. Got string.',
    },
    {
      title: 'timestamps is not PositionTimestamps object',
      construct: () =>
        new Position({
          id,
          coordinates,
          altitude,
          timestamps: 'aaa',
        } as unknown as PositionAttributes),
      expectedMessage:
        'Property "timestamps" must be PositionTimestamps object. Got string.',
    },
  ];

  problematicSituations.forEach((situation) => {
    it(`should throw exception if - ${situation.title}`, () => {
      cy.testException(async () => situation.construct()).then((exception) => {
        exception().should('be.instanceOf', InvalidPositionAttribute);
        exception().should(
          'have.property',
          'message',
          situation.expectedMessage,
        );
      });
    });
  });

  it('should return passed arguments through getters', () => {
    const position = new Position({
      id: '1234',
      coordinates,
      altitude: 10,
      timestamps,
    });

    expect(position.id()).to.string('1234');
    expect(position.latitude()).to.equal(coordinates.latitude());
    expect(position.longitude()).to.equal(coordinates.longitude());
    expect(position.coordinates()).to.equal(coordinates);
    expect(position.altitude()).to.equal(10);
    expect(position.timestamp()).to.equal(timestamps);
  });
});
