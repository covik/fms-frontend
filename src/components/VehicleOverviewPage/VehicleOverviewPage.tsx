import { useParams } from '@tanstack/router';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../../lib/VehicleService';
import { CustomError } from 'ts-custom-error';
import { VehicleOverviewView } from './VehicleOverviewView';
import { LivePreviewView } from './LivePreview';
import { LocatedVehicle } from '../../models/Vehicle';

export function VehicleOverviewPage() {
  const { vehicleId } = useParams({ from: '/vehicles/$vehicleId' });

  const { error, data: vehicle } = useQuery({
    queryKey: ['vehicles', vehicleId],
    queryFn: ({ signal }) => Vehicle.fetchAll(signal),
    select: (data) => {
      const vehicle = data.find((vehicle) => vehicle.id() === vehicleId);

      if (vehicle === undefined) {
        throw new VehicleNotFound();
      }

      return vehicle;
    },
  });

  if (error instanceof VehicleNotFound) return <div>Vozilo nije pronađeno</div>;
  if (vehicle === undefined) return <div>Učitavanje podataka</div>;

  return (
    <VehicleOverviewView title={vehicle.name()}>
      {vehicle instanceof LocatedVehicle ? (
        <LivePreviewView vehicle={vehicle}></LivePreviewView>
      ) : (
        <div>Vozilo nema poziciju</div>
      )}
    </VehicleOverviewView>
  );
}

class VehicleNotFound extends CustomError {}
