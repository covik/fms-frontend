import { InvalidPositionAttribute, Position } from './';
import type { PositionAttributes } from './';
import { Coordinates } from '../../lib/Dimension';

describe(Position.name, () => {
  const id = '1234';
  const coordinates = new Coordinates(45, 45);
  const altitude = 15;

  const problematicSituations = [
    {
      title: 'no property is provided',
      construct: () => new Position({} as PositionAttributes),
      expectedMessage: 'Zero properties passed to constructor.',
    },
    {
      title: 'id is missing',
      construct: () =>
        new Position({ coordinates, altitude } as PositionAttributes),
      expectedMessage: 'Property "id" is not passed to constructor.',
    },

    {
      title: 'coordinates is missing',
      construct: () => new Position({ id, altitude } as PositionAttributes),
      expectedMessage: 'Property "coordinates" is not passed to constructor.',
    },
    {
      title: 'altitude is missing',
      construct: () => new Position({ id, coordinates } as PositionAttributes),
      expectedMessage: 'Property "altitude" is not passed to constructor.',
    },
    {
      title: 'id is empty',
      construct: () =>
        new Position({
          id: '  ',
          coordinates,
          altitude,
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
        } as unknown as PositionAttributes),
      expectedMessage:
        'Property "coordinates" must be Coordinates object. Got string.',
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
    });

    expect(position.id()).to.string('1234');
    expect(position.latitude()).to.equal(coordinates.latitude());
    expect(position.longitude()).to.equal(coordinates.longitude());
    expect(position.coordinates()).to.equal(coordinates);
    expect(position.altitude()).to.equal(10);
  });
});
