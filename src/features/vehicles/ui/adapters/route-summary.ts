import type { RouteSummaryData } from '../types/route';
import type {
  RouteSummaryTransitionalModel,
  UnitFormatters,
} from '../../queries';

export interface SummaryFormatters
  extends Pick<
    UnitFormatters,
    'formatDuration' | 'formatLength' | 'formatSpeed'
  > {}

export function adaptRouteSummary(
  summary: RouteSummaryTransitionalModel,
  formatters: SummaryFormatters,
): RouteSummaryData {
  const { formatDuration, formatLength, formatSpeed } = formatters;

  return {
    totalDuration: formatDuration(summary.totalDuration),
    drivingDuration: formatDuration(summary.drivingDuration),
    stopDuration: formatDuration(summary.stopDuration),
    distance: formatLength(summary.distance),
    startOdometer: formatLength(summary.startOdometer),
    endOdometer: formatLength(summary.endOdometer),
    maxSpeed: formatSpeed(summary.maxSpeed),
    averageSpeed: formatSpeed(summary.averageSpeed),
  };
}
