import { RouteStopIcon } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Route Stop Icon',
  component: RouteStopIcon,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof RouteStopIcon>;
type Story = StoryObj<typeof RouteStopIcon>;

export const Default: Story = {};
