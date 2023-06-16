import { useNavigate, useParams } from '@tanstack/router';
import { Card } from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns';
import { VehicleRouteViewer } from '../VehicleRouteViewer';
import { RouteDatePicker } from './RouteDatePicker';

const routeHistory = '/vehicles/$vehicleId/history/$date';

export function RouteHistoryPage() {
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
    <VehicleRouteViewer vehicleId={vehicleId} from={startTime} to={endTime}>
      <Card sx={{ maxWidth: 'fit-content' }}>
        <RouteDatePicker targetDate={date} onChange={replaceDateURL} />
      </Card>
    </VehicleRouteViewer>
  );
}
