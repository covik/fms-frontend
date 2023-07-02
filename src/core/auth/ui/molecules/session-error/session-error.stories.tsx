import { SessionError } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Session Error',
  component: SessionError,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof SessionError>;
type Story = StoryObj<typeof SessionError>;

export const Default: Story = {};
