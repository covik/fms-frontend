import { isEqual } from 'date-fns';
import { DateCalendar } from '@mui/x-date-pickers';

export interface RouteDateSelectionAttributes {
  targetDate: Date;
  onChange: (date: Date) => void;
}

export function RouteDateSelection({
  targetDate,
  onChange,
}: RouteDateSelectionAttributes) {
  return (
    <DateCalendar
      value={targetDate}
      onChange={(v) => v && !isEqual(v, targetDate) && onChange(v)}
      disableFuture={true}
    />
  );
}
