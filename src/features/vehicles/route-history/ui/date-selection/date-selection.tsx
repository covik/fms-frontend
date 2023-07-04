import { DateCalendar } from '@mui/x-date-pickers';
import { isEqual } from 'date-fns';

export interface RouteDatePickerAttributes {
  targetDate: Date;
  onChange: (date: Date) => void;
}

export function DateSelection({
  targetDate,
  onChange,
}: RouteDatePickerAttributes) {
  return (
    <DateCalendar
      value={targetDate}
      onChange={(v) => v && !isEqual(v, targetDate) && onChange(v)}
      disableFuture={true}
    />
  );
}
