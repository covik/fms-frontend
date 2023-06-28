import { NetworkStateBlock } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Network State Block',
  component: NetworkStateBlock,
} satisfies Meta<typeof NetworkStateBlock>;
type Story = StoryObj<typeof NetworkStateBlock>;

export const Active: Story = {
  args: {
    active: true,
    latency: '4s',
  },
};

export const Interrupted: Story = {
  args: {
    active: false,
    latency: '4s',
  },
};
