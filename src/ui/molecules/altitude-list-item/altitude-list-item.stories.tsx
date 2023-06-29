import { AltitudeListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Altitude List Item',
  component: AltitudeListItem,
} satisfies Meta<typeof AltitudeListItem>;
type Story = StoryObj<typeof AltitudeListItem>;

export const Default: Story = {
  args: {
    altitude: '25 m',
  },
};
