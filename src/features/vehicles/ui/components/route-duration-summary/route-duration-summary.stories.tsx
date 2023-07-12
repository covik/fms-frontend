import { RouteDurationSummary } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Duration Summary',
  component: RouteDurationSummary,
} satisfies Meta<typeof RouteDurationSummary>;
type Story = StoryObj<typeof RouteDurationSummary>;

export const Expanded: Story = {
  args: {
    initialExpanded: true,
    driving: '8h 45m',
    stopped: '4h',
    total: '12h 45m',
  },
};

export const ExpandedAndLoading: Story = {
  args: {
    initialExpanded: true,
    driving: undefined,
    stopped: undefined,
    total: undefined,
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
