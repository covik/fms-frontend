import { useTheme } from '@mui/material';
import { PageTitle } from '#ui/atoms/page-title';
import {
  MileageTableRow,
  MileageTableRowLoading,
  MileageTableRowNoData,
} from '../../components/mileage-table-row';
import { MileageMonthSelection } from '../../components/mileage-month-selection';
import { VehicleMileageTable } from '../../components/vehicle-mileage-table';
import {
  ContentContainer,
  PageContent,
  CalendarContainer,
  PageHeader,
  PageLayout,
} from '../../templates/mileage-report';

export interface MileageItem {
  id: string;
  name: string;
  mileage: number;
  odometer: number;
}

export interface MileageReportAttributes {
  month: Date;
  vehicles: MileageItem[] | undefined;
  positiveMileage: number;
  unit: 'km';
  onDateChange: (date: Date) => void;
}

export function MileageReport({
  month,
  vehicles,
  positiveMileage,
  unit = 'km',
  onDateChange,
}: MileageReportAttributes) {
  const theme = useTheme();
  const max = vehicles
    ? Math.max(...vehicles.map((vehicle) => vehicle.mileage))
    : 0;
  const sortedByMileage = vehicles
    ? vehicles.slice().sort((a, b) => (a.mileage > b.mileage ? -1 : 1))
    : [];

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Kilometraža</PageTitle>
      </PageHeader>

      <ContentContainer>
        <CalendarContainer>
          <MileageMonthSelection targetMonth={month} onChange={onDateChange} />
        </CalendarContainer>

        <PageContent>
          <VehicleMileageTable
            noHeader={Array.isArray(vehicles) && vehicles.length === 0}
          >
            {vehicles === undefined ? (
              <>
                <MileageTableRowLoading />
                <MileageTableRowLoading />
                <MileageTableRowLoading />
              </>
            ) : vehicles.length === 0 ? (
              <MileageTableRowNoData />
            ) : (
              sortedByMileage.map((vehicle) => (
                <MileageTableRow
                  key={vehicle.id}
                  name={vehicle.name}
                  mileage={`${vehicle.mileage} ${unit}`}
                  odometer={`${vehicle.odometer} ${unit}`}
                  barColor={
                    vehicle.mileage < positiveMileage
                      ? theme.palette.warning.main
                      : theme.palette.success.main
                  }
                  barWidthPercentage={(vehicle.mileage / max) * 100}
                />
              ))
            )}
          </VehicleMileageTable>
        </PageContent>
      </ContentContainer>
    </PageLayout>
  );
}
