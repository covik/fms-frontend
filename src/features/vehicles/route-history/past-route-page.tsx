import { endOfDay, startOfDay } from 'date-fns';
import { useNavigate, useParams } from '@tanstack/router';
import { Tile } from '#ui/molecules/tile';
import { RouteViewer } from './ui/route-viewer';
import { RouteDateSelection } from '../ui/molecules/route-date-selection';

const routeHistory = '/vehicles/$vehicleId/history/$date';

export function PastRoutePage() {
  const navigate = useNavigate({ from: routeHistory });
  const { vehicleId, date } = useParams({ from: routeHistory });
  const startTime = startOfDay(date);
  const endTime = endOfDay(date);

  function replaceDateURL(date: Date) {
    void navigate({
      to: routeHistory,
      params: { vehicleId, date },
      replace: true,
    });
  }

  return (
    <RouteViewer vehicleId={vehicleId} from={startTime} to={endTime}>
      <Tile>
        <RouteDateSelection targetDate={date} onChange={replaceDateURL} />
      </Tile>
    </RouteViewer>
  );
}

export default PastRoutePage;
