import { format, intervalToDuration } from 'date-fns';

const urlFormat = 'yyyy-MM-dd';

export function formatDateForURL(date: Date) {
  return format(date, urlFormat);
}

export function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 60) return `${durationInSeconds}s`;

  const duration = intervalToDuration({ start: 0, end: durationInSeconds });
  const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];

  const valuesWithSymbol = [];
  if (hours > 0) valuesWithSymbol.push(`${hours}h`);
  if (minutes > 0) valuesWithSymbol.push(`${minutes}m`);

  return valuesWithSymbol.join(' ');
}
