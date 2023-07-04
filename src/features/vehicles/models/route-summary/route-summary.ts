import { z } from 'zod';
import { Length, Speed } from '#lib/MeasurementUnit';
import { differenceInSeconds } from 'date-fns';
import { RouteStop } from '../route-stop';

const RouteSummaryAttributesValidation = z.object({
  startTime: z.date(),
  endTime: z.date(),
  startOdometer: z.instanceof(Length.BaseLength),
  endOdometer: z.instanceof(Length.BaseLength),
  distance: z.instanceof(Length.BaseLength),
  engineSeconds: z.number().nonnegative(),
  averageSpeed: z.instanceof(Speed.BaseSpeed),
  maxSpeed: z.instanceof(Speed.BaseSpeed),
});

export type RouteSummaryAttributes = z.infer<
  typeof RouteSummaryAttributesValidation
>;

export class RouteSummary {
  private _attributes: RouteSummaryAttributes;

  public constructor(attributes: RouteSummaryAttributes) {
    this._attributes = RouteSummaryAttributesValidation.parse(attributes);
  }

  public startTime(): Date {
    return this._attributes.startTime;
  }

  public endTime(): Date {
    return this._attributes.endTime;
  }

  public startOdometer(): Length.BaseLength {
    return this._attributes.startOdometer;
  }

  public endOdometer(): Length.BaseLength {
    return this._attributes.endOdometer;
  }

  public distance(): Length.BaseLength {
    return this._attributes.distance;
  }

  public engineSeconds(): number {
    return this._attributes.engineSeconds;
  }

  public averageSpeed(): Speed.BaseSpeed {
    return this._attributes.averageSpeed;
  }

  public maxSpeed(): Speed.BaseSpeed {
    return this._attributes.maxSpeed;
  }

  public durationInSeconds(): number {
    return differenceInSeconds(this.endTime(), this.startTime());
  }

  public drivingAndStopDuration(stops: RouteStop[]) {
    const stopDuration = stops.reduce((sum, stop) => sum + stop.duration(), 0);
    const drivingDuration = this.durationInSeconds() - stopDuration;

    return {
      drivingDuration,
      stopDuration,
    };
  }
}
