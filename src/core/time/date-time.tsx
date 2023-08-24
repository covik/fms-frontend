import { createContext, useCallback, useContext, useMemo } from 'react';
import { hr } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { formatDuration } from './format-duration';
import type {
  DateTimeAPI,
  DateTimeOptions,
  DateTimeProviderProps,
} from './types';

const DateTimeContext = createContext<DateTimeOptions>({
  locale: hr,
  dateFormat: 'dd.MM.yyyy.',
  timeFormat: 'HH:mm',
});

export function DateTimeProvider({
  locale,
  dateFormat,
  timeFormat,
  children,
}: DateTimeProviderProps) {
  const parent = useContext(DateTimeContext);
  const actualLocale = locale ?? parent.locale;
  const actualDateFormat = dateFormat ?? parent.dateFormat;
  const actualTimeFormat = timeFormat ?? parent.timeFormat;

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
