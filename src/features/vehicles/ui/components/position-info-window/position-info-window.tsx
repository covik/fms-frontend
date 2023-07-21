import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { MapInfoWindow } from '#core/map/map-info-window';
import { IgnitionIcon } from '../ignition-icon';
import { MovementIcon } from '../movement-icon';
import type { Coordinates } from '#lib/dimension';

export interface PositionInfoWindowAttributes {
  coordinates: Coordinates;
  date: string;
  speed: string;
  voltage: string;
  mileage: string;
  ignition: boolean;
  movement: boolean;
}

export function PositionInfoWindow({
  coordinates,
  date,
  speed,
  voltage,
  mileage,
  ignition,
  movement,
}: PositionInfoWindowAttributes) {
  const coordinatesText = coordinates.toString();

  return (
    <MapInfoWindow coordinates={coordinates}>
      <Table
        size={'small'}
        sx={{ 'td': { padding: '4px' }, 'tr:last-of-type > td': { border: 0 } }}
      >
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography component={'span'} fontWeight={'medium'}>
                {date}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align={'center'}>{speed}</TableCell>
            <TableCell align={'center'}>{voltage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>{mileage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>{coordinatesText}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align={'center'}>
              <IgnitionIcon on={ignition} />
            </TableCell>
            <TableCell align={'center'}>
              <MovementIcon moving={movement} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </MapInfoWindow>
  );
}
