import {
  DateCalendar,
  pickersCalendarHeaderClasses,
} from '@mui/x-date-pickers';
import { endOfMonth, startOfYear } from 'date-fns';
import { styled } from '@mui/material';

export interface MileageMonthSelectionAttributes {
  targetMonth: Date;
  onChange: (date: Date) => void;
}

const ResponsiveCalendar = styled(DateCalendar)({
  width: 'auto',
  maxWidth: '320px',
  [`.${pickersCalendarHeaderClasses.root}`]: {
    marginTop: 0,
  },
});

export function MileageMonthSelection({
  targetMonth,
  onChange,
}: MileageMonthSelectionAttributes) {
  return (
    <ResponsiveCalendar
      value={targetMonth}
      views={['year', 'month']}
      openTo="month"
      minDate={startOfYear(new Date(2023, 0, 1))}
      maxDate={endOfMonth(new Date())}
      onChange={(value, selectionState) => {
        if (selectionState === 'finish' && value instanceof Date)
          onChange(value);
      }}
    />
  );
}
