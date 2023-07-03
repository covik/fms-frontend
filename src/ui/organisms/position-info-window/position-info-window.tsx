import { useMemo } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { IgnitionIcon } from '#ui/atoms/ignition-icon';
import { MovementIcon } from '#ui/atoms/movement-icon';
import type { Coordinates } from '#lib/Dimension';

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
  const latitude = coordinates.latitude();
  const longitude = coordinates.longitude();
  const position = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );
  const coordinatesText = coordinates.toString();

  return (
    <InfoWindow position={position}>
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
    </InfoWindow>
  );
}
