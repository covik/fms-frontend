import { AccountView } from './account-view';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Account',
  component: AccountView,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    logoutInProgress: false,
  },
} satisfies Meta<typeof AccountView>;

type Story = StoryObj<typeof AccountView>;

export const User: Story = {
  args: {
    name: 'Jane Doe',
    email: 'doe@example.com',
  },
};

export const Admin: Story = {
  args: {
    name: 'Admin Doe',
    email: 'admin@example.com',
    isAdmin: true,
  },
};

export const LogoutInProgress: Story = {
  args: {
    ...User.args,
    logoutInProgress: true,
  },
};
