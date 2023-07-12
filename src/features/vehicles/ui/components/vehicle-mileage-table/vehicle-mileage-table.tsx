import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  tableCellClasses,
} from '@mui/material';
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
    <TableContainer component={Paper}>
      <Table
        size={'small'}
        sx={{
          [`& .${tableCellClasses.root}`]: {
            paddingX: 1,
          },
        }}
      >
        {noHeader ? null : (
          <TableHead>
            <MileageTableHeaderRow />
          </TableHead>
        )}
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
