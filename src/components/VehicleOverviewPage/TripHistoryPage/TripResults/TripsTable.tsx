import {
  TraccarTripInterface,
  TraccarTripStopInterface,
} from '../../../../lib/Traccar';
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
import { format, intervalToDuration } from 'date-fns';
import {
  EyeOffOutline as EyeOff,
  EyeOutline as Eye,
  Navigation,
  Parking,
} from 'mdi-material-ui';

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
  stops: TraccarTripStopInterface[];
  hiddenTripsAndStops: string[];
  onVisibilityToggle: (id: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
}) {
  const theme = useTheme();

  const items = [...trips, ...stops];
  const sortedByStartTime = useMemo(() => {
    const copy = items.slice();
    copy.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
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
          const formattedStartTime = formatTime(new Date(row.startTime));
          const formattedEndTime = formatTime(new Date(row.endTime));
          const duration = formatDuration(row.duration);
          const distance = formatDistance(row.distance ?? 0);
          const isStop = row.distance === 0;
          const isHidden = hiddenTripsAndStops.includes(row.startTime);

          const Icon = isStop ? Parking : Navigation;
          const iconColor = isStop
            ? theme.palette.warning.main
            : theme.palette.info.main;

          return (
            <TableRow
              key={row.startTime}
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
              <TableCell>{duration}</TableCell>
              <TableCell>{isStop ? '' : distance}</TableCell>
              <TableCell align={'center'}>
                <IconButton
                  size={'small'}
                  onClick={() => onVisibilityToggle(row.startTime)}
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

function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 60) return `${durationInSeconds}s`;

  const duration = intervalToDuration({ start: 0, end: durationInSeconds });
  const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];

  const valuesWithSymbol = [];
  if (hours > 0) valuesWithSymbol.push(`${hours}h`);
  if (minutes > 0) valuesWithSymbol.push(`${minutes}m`);

  return valuesWithSymbol.join(' ');
}

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters < 1000) return `${distanceInMeters}m`;

  const inKilometers = distanceInMeters / 1000;
  return `${inKilometers.toFixed(1)} km`;
}
