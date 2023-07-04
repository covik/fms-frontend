import { RouteFinishIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Route Finish Icon',
  component: RouteFinishIcon,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof RouteFinishIcon>;
type Story = StoryObj<typeof RouteFinishIcon>;

export const Default: Story = {};
