import { RouteBrowser } from './RouteBrowser';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: RouteBrowser,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta<typeof RouteBrowser>;

type Story = StoryObj<typeof RouteBrowser>;

export const Default: Story = {};
