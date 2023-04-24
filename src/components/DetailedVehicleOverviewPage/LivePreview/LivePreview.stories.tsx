import { LivePreview } from './LivePreview';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LivePreview,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta<typeof LivePreview>;

type Story = StoryObj<typeof LivePreview>;

export const Default: Story = {};
