import { withMap } from '#storybook/decorators';
import { MapFetchIndicator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/Map Fetch Indicator',
  component: MapFetchIndicator,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof MapFetchIndicator>;
type Story = StoryObj<typeof MapFetchIndicator>;

export const Default: Story = {};

export const OnTheMap: Story = {
  decorators: [withMap()],
};
