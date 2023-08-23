import { withNavigation } from '#storybook/decorators';
import { Navigation } from './index';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/App Navigation',
  component: Navigation,
  decorators: [withNavigation(0)],
} satisfies Meta<typeof Navigation>;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};
