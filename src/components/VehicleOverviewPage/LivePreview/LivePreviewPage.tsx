import { useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../../lib/VehicleService';
import { LivePreviewView } from './LivePreviewView';
import { LocatedVehicle } from '../../../models/Vehicle';

export function LivePreviewPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });

  const { data: vehicle } = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new Vehicle.NotFoundException();
      }

      return vehicle;
    },
    refetchInterval: 2000,
  });

  if (vehicle === undefined || !(vehicle instanceof LocatedVehicle))
    return null;

  return <LivePreviewView vehicle={vehicle}></LivePreviewView>;
}
