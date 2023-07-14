import { intervalToDuration } from 'date-fns';
import stops from '../model/route-stops';
import { adaptRouteStops } from '../../ui/adapters/route-stop';
import type { UnitFormatters } from '../../queries';

const converters: Pick<UnitFormatters, 'formatDuration'> = {
  formatDuration: (durationInSeconds) => {
    const duration = intervalToDuration({
      start: 0,
      end: durationInSeconds * 1000,
    });
    const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];
    return `${hours}h ${minutes}m`;
  },
};

export default adaptRouteStops(stops, converters);
