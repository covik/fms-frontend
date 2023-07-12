import { RouteSpeedSummary } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Speed Summary',
  component: RouteSpeedSummary,
} satisfies Meta<typeof RouteSpeedSummary>;
type Story = StoryObj<typeof RouteSpeedSummary>;

export const Expanded: Story = {
  args: {
    initialExpanded: true,
    average: '40 km/h',
    max: '70 km/h',
  },
};

export const ExpandedAndLoading: Story = {
  args: {
    initialExpanded: true,
    average: undefined,
    max: undefined,
  },
};

export const Collapsed: Story = {
  args: {
    ...Expanded.args,
    initialExpanded: false,
  },
};

export const CollapsedAndLoading: Story = {
  args: {
    ...ExpandedAndLoading.args,
    initialExpanded: false,
  },
};
