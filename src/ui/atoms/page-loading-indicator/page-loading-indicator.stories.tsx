import { PageLoadingIndicator } from './page-loading-indicator';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Page Loading Indicator',
  component: PageLoadingIndicator,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof PageLoadingIndicator>;
type Story = StoryObj<typeof PageLoadingIndicator>;

export const Default: Story = {};
