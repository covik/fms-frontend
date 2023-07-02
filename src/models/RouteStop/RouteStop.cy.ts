import { ZodError } from 'zod';
import { RouteStop } from './RouteStop';
import { Coordinates } from '../../lib/Dimension';
import type { RouteStopAttributes } from './RouteStop';

const id = '1234';
const startTime = new Date();
const endTime = new Date();
const coordinates = new Coordinates(45.12, 15.92);
const duration = 120;

const routeStopAttributes = {
  id,
  startTime,
  endTime,
  coordinates,
  duration,
};

describe(RouteStop.name, () => {
  const problematicSituations = [
    [
      'id is missing',
      () => {
        const { id, ...attributesWithoutId } = routeStopAttributes;
        return attributesWithoutId;
      },
    ],
    [
      'id is empty',
      () => ({
        ...routeStopAttributes,
        id: '   ',
      }),
    ],
    [
      'startTime is missing',
      () => {
        const { startTime, ...attributesWithoutStartTime } =
          routeStopAttributes;
        return attributesWithoutStartTime;
      },
    ],
    [
      'startTime is not instance of Date',
      () => ({
        ...routeStopAttributes,
        startTime: 'I reject being Date',
      }),
    ],
    [
      'endTime is missing',
      () => {
        const { endTime, ...attributesWithoutEndTime } = routeStopAttributes;
        return attributesWithoutEndTime;
      },
    ],
    [
      'endTime is not instance of Date',
      () => ({
        ...routeStopAttributes,
        endTime: 'I reject being Date',
      }),
    ],
    [
      'coordinates is missing',
      () => {
        const { coordinates, ...attributesWithoutCoordinates } =
          routeStopAttributes;
        return attributesWithoutCoordinates;
      },
    ],
    [
      'coordinates is not instance of Date',
      () => ({
        ...routeStopAttributes,
        coordinates: 'I reject being Coordinates',
      }),
    ],
    [
      'duration is missing',
      () => {
        const { duration, ...attributesWithoutDuration } = routeStopAttributes;
        return attributesWithoutDuration;
      },
    ],
    [
      'duration is not a positive number',
      () => ({
        ...routeStopAttributes,
        duration: -1,
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
    const routeStop = factory(routeStopAttributes);

    expect(routeStop.id()).to.string('1234');
    expect(routeStop.startTime()).to.deep.equal(startTime);
    expect(routeStop.endTime()).to.deep.equal(endTime);
    expect(routeStop.coordinates()).to.equal(coordinates);
    expect(routeStop.duration()).to.equal(duration);
  });
});

function factory(attributes: unknown) {
  return new RouteStop(attributes as RouteStopAttributes);
}
