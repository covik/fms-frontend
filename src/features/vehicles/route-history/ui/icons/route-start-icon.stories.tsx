import { RouteStartIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Route Start Icon',
  component: RouteStartIcon,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof RouteStartIcon>;
type Story = StoryObj<typeof RouteStartIcon>;

export const Default: Story = {};
