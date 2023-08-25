import { AppBar } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Bar',
  component: AppBar,
} satisfies Meta<typeof AppBar>;
type Story = StoryObj<typeof AppBar>;

export const Transparent: Story = {};
