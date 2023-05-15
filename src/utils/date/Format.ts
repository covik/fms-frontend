import { format } from 'date-fns';

const urlFormat = 'yyyy-MM-dd';

export function formatDateForURL(date: Date) {
  return format(date, urlFormat);
}
