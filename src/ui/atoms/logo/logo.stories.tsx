import { Logo } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 40,
  },
};
Default.storyName = '40 pixels wide';
