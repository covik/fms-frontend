import { Paper } from '@mui/material';
import { MileageTableHeaderRow } from '../mileage-table-row';
import type { ReactNode } from 'react';

export interface VehicleMileageTableAttributes {
  children: ReactNode;
  noHeader?: boolean;
}

export function VehicleMileageTable({
  children,
  noHeader = false,
}: VehicleMileageTableAttributes) {
  return (
    <Paper>
      {noHeader ? null : (
        <div>
          <MileageTableHeaderRow />
        </div>
      )}
      {children}
    </Paper>
  );
}
