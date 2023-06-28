import { ConnectionDelayListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Connection Delay List Item',
  component: ConnectionDelayListItem,
} satisfies Meta<typeof ConnectionDelayListItem>;
type Story = StoryObj<typeof ConnectionDelayListItem>;

export const Default: Story = {
  args: {
    latency: '4s',
  },
};
