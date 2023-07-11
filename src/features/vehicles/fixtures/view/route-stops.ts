import { intervalToDuration } from 'date-fns';
import stops from '../model/route-stops';
import { adaptRouteStopModel } from '../../route-history/ui/route-map-elements';
import type { StopUnitConverters } from '../../route-history/ui/route-map-elements/interface';

const converters: StopUnitConverters = {
  formatDuration: (durationInSeconds) => {
    const duration = intervalToDuration({
      start: 0,
      end: durationInSeconds * 1000,
    });
    const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];
    return `${hours}h ${minutes}m`;
  },
};

export default stops.map((model) => adaptRouteStopModel(model, converters));
