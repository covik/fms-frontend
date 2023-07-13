import { withMap } from '#storybook/decorators';
import { CombinedRoute, ROUTE_COLOR } from '.';
import { mapSettings } from './storybook-shared-settings';
import positions from '../../../fixtures/view/route-positions';
import stops from '../../../fixtures/view/route-stops';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Route (Combined)',
  component: CombinedRoute,
  decorators: [withMap(mapSettings)],
  args: {
    checkpoints: positions,
    color: ROUTE_COLOR,
  },
  argTypes: {
    color: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof CombinedRoute>;
type Story = StoryObj<typeof CombinedRoute>;

export const Default: Story = {
  args: {
    stops,
  },
};

export const VisibleCheckpoints: Story = {
  args: {
    ...Default.args,
    showCheckpoints: true,
  },
};

export const WithoutStops: Story = {
  args: {
    ...Default.args,
    stops: [],
  },
};

export const OnlyStops: Story = {
  args: {
    ...Default.args,
    checkpoints: [],
  },
};

export const NoData: Story = {
  args: {
    checkpoints: [],
  },
};
