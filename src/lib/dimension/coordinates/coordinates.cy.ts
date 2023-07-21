import {
  Coordinates,
  InvalidLatitudeException,
  InvalidLongitudeException,
} from '.';

const validCoordinate = 45; // valid for both latitude and longitude
const invalidLatitudeRange = [-90.01, 90.01, NaN];
const validLatitudeRange = [-90, 90];
const invalidLongitudeRange = [-180.01, 180.01, NaN];
const validLongitudeRange = [-180, 180];

describe(Coordinates.name, () => {
  specify('latitude and longitude should be numbers', () => {
    cy.testException(
      () => new Coordinates({} as unknown as number, validCoordinate),
    ).then((exception) => {
      exception().should('be.instanceOf', InvalidLatitudeException);
      exception().should(
        'have.property',
        'message',
        'Latitude should be a number. Got object.',
      );
    });

    cy.testException(
      () => new Coordinates(validCoordinate, {} as unknown as number),
    ).then((exception) => {
      exception().should('be.instanceOf', InvalidLongitudeException);
      exception().should(
        'have.property',
        'message',
        'Longitude should be a number. Got object.',
      );
    });
  });

  specify('latitude and longitude should not coerce string to number', () => {
    cy.testException(
      () => new Coordinates('15' as unknown as number, validCoordinate),
    ).then((exception) => {
      exception().should('be.instanceOf', InvalidLatitudeException);
      exception().should(
        'have.property',
        'message',
        'Latitude should be a number. Got string.',
      );
    });

    cy.testException(
      () => new Coordinates(validCoordinate, '15' as unknown as number),
    ).then((exception) => {
      exception().should('be.instanceOf', InvalidLongitudeException);
      exception().should(
        'have.property',
        'message',
        'Longitude should be a number. Got string.',
      );
    });
  });

  specify('latitude should be between -90 and 90', () => {
    invalidLatitudeRange.forEach((value) => {
      cy.testException(() => new Coordinates(value, validCoordinate)).then(
        (exception) => {
          exception().should('be.instanceOf', InvalidLatitudeException);
          exception().should(
            'have.property',
            'message',
            `Latitude must be between -90 and 90. Got ${value}.`,
          );
        },
      );
    });

    validLatitudeRange.forEach((value) => {
      cy.testException(() => new Coordinates(value, validCoordinate)).then(
        (exception) => {
          exception().should('be.undefined');
        },
      );
    });
  });

  specify('longitude should be between -180 and 180', () => {
    invalidLongitudeRange.forEach((value) => {
      cy.testException(() => new Coordinates(validCoordinate, value)).then(
        (exception) => {
          exception().should('be.instanceOf', InvalidLongitudeException);
          exception().should(
            'have.property',
            'message',
            `Longitude must be between -180 and 180. Got ${value}.`,
          );
        },
      );
    });

    validLongitudeRange.forEach((value) => {
      cy.testException(() => new Coordinates(validCoordinate, value)).then(
        (exception) => {
          exception().should('be.undefined');
        },
      );
    });
  });

  specify('latitude() should return passed latitude as number', () => {
    const coordinates = new Coordinates(45, 150);
    expect(coordinates.latitude()).to.equal(45);
  });

  specify('longitude() should return passed longitude as number', () => {
    const coordinates = new Coordinates(45, 150);
    expect(coordinates.longitude()).to.equal(150);
  });

  specify(
    'toString() should return coordinates in {latitude}, {longitude} format',
    () => {
      const coordinates = new Coordinates(45.15, 150.29801);
      expect(coordinates.toString()).to.equal('45.15, 150.29801');
    },
  );

  specify('toGoogleMapsUrl() should return a Google Maps link', () => {
    const coordinates = new Coordinates(44.09437450651524, 15.250005920779836);
    expect(coordinates.toGoogleMapsUrl()).to.equal(
      `${Coordinates.GOOGLE_MAPS_URL}/search/?api=1&query=44.09437450651524%2C15.250005920779836`,
    );
  });

  specify(
    'toGoogleStreetViewUrl() should return a Google Maps Street View link',
    () => {
      const coordinates = new Coordinates(
        44.09437450651524,
        15.250005920779836,
      );

      expect(coordinates.toGoogleStreetViewUrl()).to.equal(
        `${Coordinates.GOOGLE_MAPS_URL}/@?api=1&map_action=pano&viewpoint=44.09437450651524%2C15.250005920779836`,
      );

      expect(coordinates.toGoogleStreetViewUrl(250)).to.equal(
        `${Coordinates.GOOGLE_MAPS_URL}/@?api=1&map_action=pano&viewpoint=44.09437450651524%2C15.250005920779836&heading=250`,
      );
    },
  );
});
