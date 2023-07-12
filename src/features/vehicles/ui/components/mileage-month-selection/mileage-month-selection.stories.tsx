import { withCalendar } from '#storybook/decorators';
import { MileageMonthSelection } from './mileage-month-selection';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Mileage Month Selection',
  component: MileageMonthSelection,
  decorators: [withCalendar()],
  argTypes: {
    targetMonth: { control: 'date' },
  },
} satisfies Meta<typeof MileageMonthSelection>;
type Story = StoryObj<typeof MileageMonthSelection>;

export const Default: Story = {
  args: {
    targetMonth: new Date(),
  },
};
