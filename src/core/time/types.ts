import type { Locale } from 'date-fns';
import type { ReactNode } from 'react';

export interface DateTimeOptions {
  locale: Locale;
  dateFormat: string;
  timeFormat: string;
}

export interface DateTimeAPI {
  distanceToNowStrictWithSuffix(date: Date): string;
  formatTime(date: Date): string;
  formatDuration(durationInSeconds: number): string;
  formatDateTime(date: Date): string;
}

export interface DateTimeProviderProps extends Partial<DateTimeOptions> {
  children: ReactNode;
}
