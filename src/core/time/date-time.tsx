import { createContext, useCallback, useContext, useMemo } from 'react';
import { hr } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  format,
  formatDistanceToNowStrict,
  intervalToDuration,
} from 'date-fns';
import type {
  DateTimeAPI,
  DateTimeOptions,
  DateTimeProviderProps,
} from './types';

const defaultOptions: DateTimeOptions = {
  locale: hr,
  dateFormat: 'dd.MM.yyyy.',
  timeFormat: 'HH:mm',
};

const DateTimeContext = createContext<DateTimeOptions>(defaultOptions);

export function DateTimeProvider({
  locale,
  dateFormat,
  timeFormat,
  children,
}: DateTimeProviderProps) {
  const actualLocale = locale ?? defaultOptions.locale;
  const actualDateFormat = dateFormat ?? defaultOptions.dateFormat;
  const actualTimeFormat = timeFormat ?? defaultOptions.timeFormat;

  const value = useMemo<DateTimeOptions>(
    () => ({
      locale: actualLocale,
      dateFormat: actualDateFormat,
      timeFormat: actualTimeFormat,
    }),
    [actualLocale, actualDateFormat, actualTimeFormat],
  );

  return (
    <DateTimeContext.Provider value={value}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={actualLocale}
      >
        {children}
      </LocalizationProvider>
    </DateTimeContext.Provider>
  );
}

export function useDateTime(): DateTimeAPI {
  const context = useContext(DateTimeContext);

  const distanceToNowStrictWithSuffix = useCallback(
    (date: Date) =>
      formatDistanceToNowStrict(date, {
        addSuffix: true,
        locale: context.locale,
      }),
    [context.locale],
  );

  const formatTime = useCallback(
    (date: Date) => format(date, context.timeFormat),
    [context.timeFormat],
  );

  const formatDateTime = useCallback(
    (date: Date) => format(date, `${context.dateFormat} ${context.timeFormat}`),
    [context.dateFormat, context.timeFormat],
  );

  return {
    distanceToNowStrictWithSuffix,
    formatTime,
    formatDuration,
    formatDateTime,
  };
}

function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 60) return `${durationInSeconds}s`;

  const duration = intervalToDuration({
    start: 0,
    end: durationInSeconds * 1000,
  });
  const [hours, minutes] = [duration.hours ?? 0, duration.minutes ?? 0];

  const valuesWithSymbol = [];
  if (hours > 0) valuesWithSymbol.push(`${hours}h`);
  if (minutes > 0) valuesWithSymbol.push(`${minutes}m`);

  return valuesWithSymbol.join(' ');
}
