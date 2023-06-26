import { MileageListItem } from './mileage-list-item';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Mileage List Item',
  component: MileageListItem,
} satisfies Meta<typeof MileageListItem>;
type Story = StoryObj<typeof MileageListItem>;

export const Default: Story = {
  args: {
    mileage: '10 km',
  },
};
