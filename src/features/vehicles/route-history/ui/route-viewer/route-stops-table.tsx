import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDateTime } from '#core/time';
import type { RouteStop } from '../../../models/route-stop';

export interface RouteStopsTableAttributes {
  stops: RouteStop[] | undefined;
}

export function RouteStopsTable({ stops }: RouteStopsTableAttributes) {
  const { formatTime, formatDuration } = useDateTime();

  if (stops && stops.length === 0) {
    return null;
  }

  const indexWidth = '30px';
  const departureWidth = '60px';
  const arrivalWidth = '60px';

  return (
    <Table
      size={'small'}
      sx={{
        '& .MuiTableCell-root': {
          paddingX: 1,
        },
      }}
    >
      <TableHead>
        <TableRow
          sx={(theme) => ({
            '& .MuiTableCell-root': {
              paddingBottom: '0 !important',
              textTransform: 'uppercase',
              color: `${theme.palette.text.secondary} !important`,
            },
          })}
        >
          <TableCell sx={{ width: indexWidth }}>#</TableCell>
          <TableCell align={'center'} sx={{ width: departureWidth }}>
            Od
          </TableCell>
          <TableCell align={'center'} sx={{ width: arrivalWidth }}>
            Do
          </TableCell>
          <TableCell>Trajanje</TableCell>
        </TableRow>
      </TableHead>

      <TableBody
        sx={{
          '& .MuiTableCell-root': { color: 'text.primary' },
          '& > tr:last-of-type td': { border: 0 },
        }}
      >
        {stops !== undefined ? (
          stops.map((stop, index) => (
            <TableRow key={stop.id()}>
              <TableCell sx={{ width: indexWidth }}>{index + 1}</TableCell>
              <TableCell align={'center'} sx={{ width: departureWidth }}>
                {formatTime(stop.startTime())}
              </TableCell>
              <TableCell align={'center'} sx={{ width: arrivalWidth }}>
                {formatTime(stop.endTime())}
              </TableCell>
              <TableCell>{formatDuration(stop.duration())}</TableCell>
            </TableRow>
          ))
        ) : (
          <>
            {[1, 2, 3].map((index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: indexWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell align={'center'} sx={{ width: departureWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell align={'center'} sx={{ width: arrivalWidth }}>
                  <Skeleton variant={'text'} />
                </TableCell>
                <TableCell>
                  <Skeleton variant={'text'} />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
