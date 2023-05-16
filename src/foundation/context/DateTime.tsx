import { createContext, useCallback, useContext, useMemo } from 'react';
import { hr } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatDistanceToNowStrict } from 'date-fns';
import type { Locale } from 'date-fns';
import type { ReactNode } from 'react';

export interface FormatAPI {
  distanceToNowStrictWithSuffix(date: Date): string;
}

interface DateTimeOptions {
  locale: Locale;
  dateFormat: string;
  timeFormat: string;
}

const defaultOptions: DateTimeOptions = {
  locale: hr,
  dateFormat: 'dd.MM.yyyy.',
  timeFormat: 'hh:mm',
};

const DateTimeContext = createContext<DateTimeOptions>(defaultOptions);

export function DateTimeProvider({
  locale,
  dateFormat,
  timeFormat,
  children,
}: Partial<DateTimeOptions> & { children: ReactNode }) {
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

export function useDateTime(): FormatAPI {
  const context = useContext(DateTimeContext);

  const distanceToNowStrictWithSuffix = useCallback(
    (date: Date) =>
      formatDistanceToNowStrict(date, {
        addSuffix: true,
        locale: context.locale,
      }),
    [context.locale],
  );

  return {
    distanceToNowStrictWithSuffix,
  };
}
