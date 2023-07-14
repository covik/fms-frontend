import { format } from 'date-fns';
import { Length, Speed, Voltage } from '#lib/measurement-unit';
import positions from '../model/route-positions';
import { adaptRoutePositions } from '../../ui/adapters/route-position';
import type { UnitFormatters } from '../../queries';

const converters: Pick<
  UnitFormatters,
  'formatDateTime' | 'formatLength' | 'formatSpeed' | 'formatVoltage'
> = {
  formatDateTime: (unit) => format(unit, 'dd.MM.yyyy. HH:mm:ss'),
  formatLength: (unit) => Length.adaptiveFormat(unit, 1),
  formatSpeed: (unit) => Speed.format(Speed.convert(unit).toKph()),
  formatVoltage: (unit) => Voltage.format(unit),
};

export default adaptRoutePositions(positions, converters);
