import { Chip } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { format, intervalToDuration } from 'date-fns';
import { useMemo } from 'react';
import { MapMarkerDistance, Navigation, Parking } from 'mdi-material-ui';
import type {
  TraccarTripInterface,
  TraccarTripStopInterface,
} from '../../../../lib/Traccar';

const formatTime = (date: Date) => format(date, 'HH:mm');

export function CombinedTimeline({
  trips,
  stops,
}: {
  trips: TraccarTripInterface[];
  stops: TraccarTripStopInterface[];
}) {
  const items = [...trips, ...stops];
  const sortedByStartTime = useMemo(() => {
    const copy = items.slice();
    copy.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    return copy;
  }, [items]);

  return (
    <Timeline sx={{ margin: 0, p: 0 }}>
      {sortedByStartTime.map((val) => {
        const formattedStartTime = formatTime(new Date(val.startTime));
        const formattedEndTime = formatTime(new Date(val.endTime));
        const duration = formatDuration(val.duration);
        const distance = formatDistance(val.distance ?? 0);
        const isStop = val.distance === 0;

        const dotColor = isStop ? 'warning' : 'info';
        const shouldDisplayDistance = !isStop;
        const icon = isStop ? (
          <Parking fontSize={'small'} />
        ) : (
          <Navigation
            fontSize={'small'}
            style={{ transform: 'rotate(180deg)' }}
          />
        );

        return (
          <TimelineItem key={val.startTime}>
            <TimelineOppositeContent
              color={'text.secondary'}
              sx={{ alignSelf: 'center' }}
            >
              {`${formattedStartTime} - ${formattedEndTime}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color={dotColor} variant={'filled'}>
                {icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ color: 'text.secondary', alignSelf: 'center' }}
            >
              <Chip
                label={duration}
                sx={{ mr: shouldDisplayDistance ? 1 : 0 }}
              />
              {shouldDisplayDistance ? (
                <Chip label={distance} icon={<MapMarkerDistance />} />
              ) : null}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
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
