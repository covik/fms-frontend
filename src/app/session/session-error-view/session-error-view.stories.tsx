import { SessionErrorView } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Pages/Session Error',
  component: SessionErrorView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof SessionErrorView>;
type Story = StoryObj<typeof SessionErrorView>;

export const Default: Story = {};
