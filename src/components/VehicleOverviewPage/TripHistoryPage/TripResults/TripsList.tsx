import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useDateTime } from '../../../../foundation';
import { useMemo } from 'react';
import { RouteStop } from '../../../../models/RouteStop';
import { Length } from '../../../../lib/MeasurementUnit';
import { formatDuration } from '../../../../utils/date';
import {
  EyeOffOutline as EyeOff,
  EyeOutline as Eye,
  Navigation,
  Parking,
} from 'mdi-material-ui';
import type { TraccarTripInterface } from '../../../../lib/Traccar';

interface TripsListAttributes {
  trips: TraccarTripInterface[];
  stops: RouteStop[];
  hiddenTripsAndStops: string[];
  onVisibilityToggle: (id: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
}

export function TripsList({
  trips,
  stops,
  hiddenTripsAndStops,
  onVisibilityToggle,
  onHideAll,
  onShowAll,
}: TripsListAttributes) {
  const theme = useTheme();
  const { formatTime } = useDateTime();

  const sortedByStartTime = useMemo(() => {
    const items = [...trips, ...stops];
    items.sort((a, b) => {
      const firstStartTime =
        a instanceof RouteStop ? a.startTime() : new Date(a.startTime);
      const secondStartTime =
        b instanceof RouteStop ? b.startTime() : new Date(b.startTime);
      return firstStartTime > secondStartTime ? 1 : -1;
    });
    return items;
  }, [trips, stops]);

  return (
    <List dense disablePadding>
      {sortedByStartTime.map((row) => {
        const isStop = row instanceof RouteStop;
        const id = isStop ? row.id() : row.startTime;
        const startTime = isStop ? row.startTime() : new Date(row.startTime);
        const endTime = isStop ? row.endTime() : new Date(row.endTime);
        const duration = isStop ? row.duration() : row.duration / 1000;
        const distance = new Length.Meter(isStop ? 0 : row.distance);

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        const formattedDuration = formatDuration(duration);
        const formattedDistance = Length.adaptiveFormat(distance, 1);
        const isHidden = hiddenTripsAndStops.includes(id);

        const Icon = isStop ? Parking : Navigation;
        const iconColor = isStop
          ? theme.palette.warning.main
          : theme.palette.info.main;

        return (
          <ListItem key={id} disableGutters>
            <ListItemText disableTypography>
              <Typography color={'text.secondary'} component={'div'}>
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                  <div style={{ width: '2.5rem', textAlign: 'center' }}>
                    {formattedStartTime}
                  </div>
                  <Avatar
                    sx={{
                      backgroundColor: iconColor,
                      width: 28,
                      height: 28,
                    }}
                  >
                    <Icon fontSize={'small'} />
                  </Avatar>
                  <Stack
                    spacing={1}
                    direction={'row'}
                    justifyContent={'space-between'}
                    flex={1}
                  >
                    <div>{formattedDuration}</div>
                    <div>{isStop ? null : formattedDistance}</div>
                  </Stack>
                </Stack>
              </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton size={'small'} onClick={() => onVisibilityToggle(id)}>
                {isHidden ? <EyeOff /> : <Eye />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
