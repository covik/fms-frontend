import { LogoutButton } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Logout Button',
  component: LogoutButton,
} satisfies Meta<typeof LogoutButton>;
type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {
  args: {
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
