import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  tableCellClasses,
} from '@mui/material';
import { StyledRow } from '../../molecules/mileage-table-row';
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
            <StyledRow>
              <TableCell>Vozilo</TableCell>
              <TableCell>Kilometri</TableCell>
              <TableCell></TableCell>
            </StyledRow>
          </TableHead>
        )}
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
