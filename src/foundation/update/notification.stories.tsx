import { withAppUpdate } from '#storybook/decorators';
import { AppUpdateNotification } from './notification';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/App Update Notification',
  component: AppUpdateNotification,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof AppUpdateNotification>;
type Story = StoryObj<typeof AppUpdateNotification>;

export const UpdateReady: Story = {
  decorators: [withAppUpdate(true)],
};

export const NoUpdate = {
  decorators: [withAppUpdate(false)],
};
