import { format } from 'date-fns';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
import positions from '../model/route-positions';
import { adaptRoutePositionModel } from '../../ui/components/route-map-elements';
import type { PositionUnitConverters } from '../../ui/components/route-map-elements/interface';

const converters: Pick<
  PositionUnitConverters,
  'formatDateTime' | 'formatMileage' | 'formatSpeed' | 'formatVoltage'
> = {
  formatDateTime: (unit) => format(unit, 'dd.MM.yyyy. HH:mm:ss'),
  formatMileage: (unit) => Length.adaptiveFormat(unit, 1),
  formatSpeed: (unit) => Speed.format(Speed.convert(unit).toKph()),
  formatVoltage: (unit) => Voltage.format(unit),
};

export default positions.map((model) =>
  adaptRoutePositionModel(model, converters),
);
