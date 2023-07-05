import { Decorator } from '@storybook/react';
import { DateTimeProvider } from '#core/time';

export function withCalendar(): Decorator {
  return (Story) => (
    <DateTimeProvider>
      <Story />
    </DateTimeProvider>
  );
}
