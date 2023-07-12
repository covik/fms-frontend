import { addDays } from 'date-fns';
import { withCalendar } from '#storybook/decorators';
import { RouteDateSelection } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Date Selection',
  component: RouteDateSelection,
  decorators: [withCalendar()],
  args: {
    targetDate: new Date(),
  },
} satisfies Meta<typeof RouteDateSelection>;
type Story = StoryObj<typeof RouteDateSelection>;

export const Today: Story = {};

export const InvalidDate: Story = {
  args: {
    targetDate: addDays(new Date(), 1),
  },
};
