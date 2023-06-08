import { ZodError } from 'zod';
import { RouteSummary } from './RouteSummary';
import { Length, Speed } from '../../lib/MeasurementUnit';
import {
  stops,
  totalDuration as totalStopDuration,
} from '../RouteStop/fixtures';
import type { RouteSummaryAttributes } from './RouteSummary';

const startTime = new Date('2000-01-01T00:00:00Z');
const endTime = new Date('2000-01-01T06:30:00Z');
const startOdometer = new Length.Kilometer(100500);
const endOdometer = new Length.Kilometer(100700);
const distance = new Length.Meter(200000);
const engineSeconds = 3600;
const averageSpeed = new Speed.Knots(10);
const maxSpeed = new Speed.Knots(30);

const routeSummaryAttributes = {
  startTime,
  endTime,
  startOdometer,
  endOdometer,
  distance,
  engineSeconds,
  averageSpeed,
  maxSpeed,
};

const sixHours = 6 * 3600;
const thirtyMinutes = 30 * 60;

describe(RouteSummary.name, () => {
  const problematicSituations = [
    [
      'startTime is missing',
      () => {
        const { startTime, ...attributesWithoutStartTime } =
          routeSummaryAttributes;
        return attributesWithoutStartTime;
      },
    ],
    [
      'startTime is not instance of Date',
      () => ({
        ...routeSummaryAttributes,
        startTime: 'I reject being a Date',
      }),
    ],
    [
      'endTime is missing',
      () => {
        const { endTime, ...attributesWithoutEndTime } = routeSummaryAttributes;
        return attributesWithoutEndTime;
      },
    ],
    [
      'endTime is not instance of Date',
      () => ({
        ...routeSummaryAttributes,
        endTime: 'I reject being a Date',
      }),
    ],
    [
      'startOdometer is missing',
      () => {
        const { startOdometer, ...attributesWithoutStartOdometer } =
          routeSummaryAttributes;
        return attributesWithoutStartOdometer;
      },
    ],
    [
      `startOdometer is not instance of ${Length.BaseLength.name}`,
      () => ({
        ...routeSummaryAttributes,
        startOdometer: `I reject being ${Length.BaseLength.name}`,
      }),
    ],
    [
      'endOdometer is missing',
      () => {
        const { endOdometer, ...attributesWithoutEndOdometer } =
          routeSummaryAttributes;
        return attributesWithoutEndOdometer;
      },
    ],
    [
      `endOdometer is not instance of ${Length.BaseLength.name}`,
      () => ({
        ...routeSummaryAttributes,
        endOdometer: `I reject being ${Length.BaseLength.name}`,
      }),
    ],
    [
      'distance is missing',
      () => {
        const { distance, ...attributesWithoutDistance } =
          routeSummaryAttributes;
        return attributesWithoutDistance;
      },
    ],
    [
      `distance is not instance of ${Length.BaseLength.name}`,
      () => ({
        ...routeSummaryAttributes,
        distance: `I reject being ${Length.BaseLength.name}`,
      }),
    ],
    [
      'engineSeconds in missing',
      () => {
        const { engineSeconds, ...attributesWithoutEngineSeconds } =
          routeSummaryAttributes;
        return attributesWithoutEngineSeconds;
      },
    ],
    [
      'engineSeconds is negative number',
      () => ({
        ...routeSummaryAttributes,
        engineSeconds: -1,
      }),
    ],
    [
      'averageSpeed is missing',
      () => {
        const { averageSpeed, ...attributesWithoutAverageSpeed } =
          routeSummaryAttributes;
        return attributesWithoutAverageSpeed;
      },
    ],
    [
      'averageSpeed is not BaseSpeed object',
      () => ({
        ...routeSummaryAttributes,
        averageSpeed: 'I reject being BaseSpeed object',
      }),
    ],
    [
      'maxSpeed is missing',
      () => {
        const { maxSpeed, ...attributesWithoutMaxSpeed } =
          routeSummaryAttributes;
        return attributesWithoutMaxSpeed;
      },
    ],
    [
      'maxSpeed is not BaseSpeed object',
      () => ({
        ...routeSummaryAttributes,
        maxSpeed: 'I reject being BaseSpeed object',
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
    const summary = factory(routeSummaryAttributes);

    expect(summary.startTime()).to.deep.equal(startTime);
    expect(summary.endTime()).to.deep.equal(endTime);
    expect(summary.startOdometer()).to.equal(startOdometer);
    expect(summary.endOdometer()).to.equal(endOdometer);
    expect(summary.distance()).to.equal(distance);
    expect(summary.engineSeconds()).to.equal(engineSeconds);
    expect(summary.averageSpeed()).to.equal(averageSpeed);
    expect(summary.maxSpeed()).to.equal(maxSpeed);
  });

  it('should calculate duration in seconds from startTime and endTime', () => {
    const summary = factory(routeSummaryAttributes);
    const expectedDuration = sixHours + thirtyMinutes;
    expect(summary.durationInSeconds()).to.equal(expectedDuration);
  });

  it('should calculate driving and stop duration', () => {
    const summary = factory(routeSummaryAttributes);
    const totalDuration = sixHours + thirtyMinutes;
    const expectedStopDuration = totalStopDuration;
    const expectedDrivingDuration = totalDuration - expectedStopDuration;

    const { drivingDuration, stopDuration } =
      summary.drivingAndStopDuration(stops);

    expect(stopDuration).to.equal(expectedStopDuration);
    expect(drivingDuration).to.equal(expectedDrivingDuration);
  });
});

function factory(attributes: unknown) {
  return new RouteSummary(attributes as RouteSummaryAttributes);
}
