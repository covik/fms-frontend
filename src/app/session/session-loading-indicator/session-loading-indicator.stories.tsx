import { SessionLoadingIndicator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Session Loading Indicator',
  component: SessionLoadingIndicator,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof SessionLoadingIndicator>;
type Story = StoryObj<typeof SessionLoadingIndicator>;

export const Default: Story = {};
