import { SessionLoadingView } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Session Loading',
  component: SessionLoadingView,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof SessionLoadingView>;
type Story = StoryObj<typeof SessionLoadingView>;

export const Default: Story = {};
