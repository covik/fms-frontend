import { withMap } from '#storybook/decorators';
import { MapAddressSearchControl } from './address-search-control';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Map Address Search Control',
  component: MapAddressSearchControl,
  decorators: [withMap()],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof MapAddressSearchControl>;
type Story = StoryObj<typeof MapAddressSearchControl>;

export const Default: Story = {};

export const OnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
