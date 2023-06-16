import { endOfDay, startOfDay } from 'date-fns';
import { useParams } from '@tanstack/router';
import { VehicleRouteViewer } from '../VehicleRouteViewer';

const today = new Date();
const from = startOfDay(today);
const to = endOfDay(today);

export function TodayRoutePage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/today' });
  return <VehicleRouteViewer vehicleId={vehicleId} from={from} to={to} />;
}
