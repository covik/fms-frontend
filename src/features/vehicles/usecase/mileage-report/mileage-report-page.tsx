import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Length } from '#lib/measurement-unit';
import { VehicleService } from '../../services/vehicle-service';
import { MileageService } from '../../services/mileage-service';
import { MileageReport } from '../../ui/pages/mileage-report';
import type { MileageSummary } from '../../models/mileage-summary';
import type { MileageItem } from '../../ui/pages/mileage-report';

const currentMonth = new Date();

export function MileageReportPage() {
  const [selectedMonth, selectMonth] = useState(currentMonth);

  const vehicles = useQuery({
    queryKey: ['vehicles'],
    queryFn: ({ signal }) => VehicleService.fetchAll(signal),
    staleTime: Infinity,
    select: (vehicles) => vehicles.map((vehicle) => vehicle.id()),
  });

  const mileage = useQuery({
    enabled: vehicles.data !== undefined && vehicles.data.length > 0,
    staleTime: Infinity,
    queryKey: [
      'vehicles',
      'mileage',
      { vehicles: vehicles.data },
      selectedMonth,
    ],
    queryFn: ({ signal }) =>
      MileageService.fetchForMonth(selectedMonth, vehicles.data ?? [], signal),
  });

  const adaptedMileageData = adaptMileageData(mileage.data);
  const averageMileage = adaptedMileageData
    ? calculateAverageMileage(adaptedMileageData)
    : 0;

  return (
    <MileageReport
      month={selectedMonth}
      vehicles={adaptedMileageData}
      positiveMileage={averageMileage}
      unit={'km'}
      onDateChange={selectMonth}
    />
  );
}

export default MileageReportPage;

function adaptMileageData(
  vehicles: MileageSummary[] | undefined,
): MileageItem[] | undefined {
  if (vehicles === undefined) return undefined;

  return vehicles.map((vehicle) => ({
    id: vehicle.vehicleId(),
    name: vehicle.vehicleName(),
    mileage: formatMileage(vehicle.mileage()),
    odometer: formatMileage(vehicle.odometer()),
  }));
}

function formatMileage(mileage: Length.BaseLength): number {
  return Math.round(Length.convertToKilometers(mileage).value());
}

function calculateAverageMileage(vehicles: MileageItem[]) {
  const count = vehicles.filter((vehicle) => vehicle.mileage > 0).length;
  const total = vehicles.reduce((sum, vehicle) => (sum += vehicle.mileage), 0);
  return total / count;
}
