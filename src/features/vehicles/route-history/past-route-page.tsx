import { useNavigate, useParams } from '@tanstack/router';
import { Card } from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns';
import { RouteViewer } from './ui/route-viewer';
import { DateSelection } from './ui/date-selection';

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
      <Card sx={{ maxWidth: 'fit-content' }}>
        <DateSelection targetDate={date} onChange={replaceDateURL} />
      </Card>
    </RouteViewer>
  );
}

export default PastRoutePage;
