import { InvalidPositionAttribute, Position } from './';
import type { PositionAttributes } from './';

describe(Position.name, () => {
  const id = '1234';
  const latitude = 90;
  const longitude = 45;
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
        new Position({ latitude, longitude, altitude } as PositionAttributes),
      expectedMessage: 'Property "id" is not passed to constructor.',
    },
    {
      title: 'latitude is missing',
      construct: () =>
        new Position({ id, longitude, altitude } as PositionAttributes),
      expectedMessage: 'Property "latitude" is not passed to constructor.',
    },
    {
      title: 'longitude is missing',
      construct: () =>
        new Position({ id, latitude, altitude } as PositionAttributes),
      expectedMessage: 'Property "longitude" is not passed to constructor.',
    },
    {
      title: 'altitude is missing',
      construct: () =>
        new Position({ id, latitude, longitude } as PositionAttributes),
      expectedMessage: 'Property "altitude" is not passed to constructor.',
    },
    {
      title: 'id is empty',
      construct: () =>
        new Position({
          id: '  ',
          latitude,
          longitude,
          altitude,
        } as PositionAttributes),
      expectedMessage: 'Property "id" must not be empty string.',
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
      latitude: 90,
      longitude: 45,
      altitude: 10,
    });

    expect(position.id()).to.string('1234');
    expect(position.latitude()).to.equal(90);
    expect(position.longitude()).to.equal(45);
    expect(position.altitude()).to.equal(10);
  });
});
