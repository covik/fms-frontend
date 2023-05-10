import { AccountView } from './AccountView';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AccountView,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <AccountView {...args}>
      <div>Rest of content</div>
    </AccountView>
  ),
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
