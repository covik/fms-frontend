import { withMap } from '#storybook/decorators';
import { RouteLine } from './route-line';
import { mapSettings } from './storybook-shared-settings';
import points from '../../../fixtures/view/route-positions';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Line',
  component: RouteLine,
  decorators: [withMap(mapSettings)],
  args: {
    color: '#dd0000',
  },
  argTypes: {
    color: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof RouteLine>;
type Story = StoryObj<typeof RouteLine>;

export const Default: Story = {
  args: {
    points,
  },
};

export const NoCheckpoints: Story = {
  args: {},
};
