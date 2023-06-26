import { IgnitionIcon } from './ignition-icon';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Ignition Icon',
  component: IgnitionIcon,
} satisfies Meta<typeof IgnitionIcon>;
type Story = StoryObj<typeof IgnitionIcon>;

export const Off: Story = {
  args: {
    on: false,
  },
};

export const On: Story = {
  args: {
    on: true,
  },
};
