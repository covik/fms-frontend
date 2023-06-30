import { AppUpdateBanner } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Update Banner',
  component: AppUpdateBanner,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof AppUpdateBanner>;
type Story = StoryObj<typeof AppUpdateBanner>;

export const Default: Story = {};
