import { useMemo } from 'react';
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import {
  EyeOffOutline as EyeOff,
  EyeOutline as Eye,
  Navigation,
  Parking,
} from 'mdi-material-ui';
import { RouteStop } from '../../../../models/RouteStop';
import { formatDuration } from '../../../../utils/date';
import type { TraccarTripInterface } from '../../../../lib/Traccar';

const formatTime = (date: Date) => format(date, 'HH:mm');

export function TripsTable({
  trips,
  stops,
  hiddenTripsAndStops,
  onVisibilityToggle,
  onHideAll,
  onShowAll,
}: {
  trips: TraccarTripInterface[];
  stops: RouteStop[];
  hiddenTripsAndStops: string[];
  onVisibilityToggle: (id: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
}) {
  const theme = useTheme();

  const items = [...trips, ...stops];
  const sortedByStartTime = useMemo(() => {
    const copy = items.slice();
    copy.sort((a, b) => {
      const firstStartTime =
        a instanceof RouteStop ? a.startTime() : new Date(a.startTime);
      const secondStartTime =
        b instanceof RouteStop ? b.startTime() : new Date(b.startTime);
      return firstStartTime > secondStartTime ? 1 : -1;
    });
    return copy;
  }, [items]);

  const isEverythingHidden =
    hiddenTripsAndStops.length === trips.length + stops.length;

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
          sx={{
            '& .MuiTableCell-root': {
              paddingBottom: '0 !important',
              textTransform: 'uppercase',
              color: `${theme.palette.text.secondary} !important`,
            },
          }}
        >
          <TableCell>#</TableCell>
          <TableCell></TableCell>
          <TableCell>Od/Do</TableCell>
          <TableCell>Trajanje</TableCell>
          <TableCell>Udaljenost</TableCell>
          <TableCell align={'center'}>
            <IconButton
              size={'small'}
              onClick={() => (isEverythingHidden ? onShowAll() : onHideAll())}
            >
              {isEverythingHidden ? <EyeOff /> : <Eye />}
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody sx={{ '& .MuiTableCell-root': { color: 'text.primary' } }}>
        {sortedByStartTime.map((row, i) => {
          const isStop = row instanceof RouteStop;
          const id = isStop ? row.id() : row.startTime;
          const startTime = isStop ? row.startTime() : new Date(row.startTime);
          const endTime = isStop ? row.endTime() : new Date(row.endTime);
          const duration = isStop ? row.duration() : row.duration / 1000;
          const distance = isStop ? 0 : row.distance;

          const formattedStartTime = formatTime(startTime);
          const formattedEndTime = formatTime(endTime);
          const formattedDuration = formatDuration(duration);
          const formattedDistance = formatDistance(distance);
          const isHidden = hiddenTripsAndStops.includes(id);

          const Icon = isStop ? Parking : Navigation;
          const iconColor = isStop
            ? theme.palette.warning.main
            : theme.palette.info.main;

          return (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Avatar
                  sx={{
                    backgroundColor: iconColor,
                    width: 28,
                    height: 28,
                  }}
                >
                  <Icon fontSize={'small'} />
                </Avatar>
              </TableCell>
              <TableCell>
                {formattedStartTime}
                <br />
                {formattedEndTime}
              </TableCell>
              <TableCell>{formattedDuration}</TableCell>
              <TableCell>{isStop ? '' : formattedDistance}</TableCell>
              <TableCell align={'center'}>
                <IconButton
                  size={'small'}
                  onClick={() => onVisibilityToggle(id)}
                >
                  {isHidden ? <EyeOff /> : <Eye />}
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters < 1000) return `${distanceInMeters.toFixed(1)}m`;

  const inKilometers = distanceInMeters / 1000;
  return `${inKilometers.toFixed(1)} km`;
}
