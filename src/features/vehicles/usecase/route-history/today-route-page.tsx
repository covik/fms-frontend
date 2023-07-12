import { endOfDay, startOfDay } from 'date-fns';
import { useParams } from '@tanstack/router';
import { RouteViewer } from '../../ui/components/route-viewer';

const today = new Date();
const from = startOfDay(today);
const to = endOfDay(today);

export function TodayRoutePage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId/today' });
  return <RouteViewer vehicleId={vehicleId} from={from} to={to} />;
}

export default TodayRoutePage;
