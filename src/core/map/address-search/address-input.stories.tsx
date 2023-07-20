import { MapAddressInput } from './address-input';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Map Address Input',
  component: MapAddressInput,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof MapAddressInput>;
type Story = StoryObj<typeof MapAddressInput>;

export const Default: Story = {};
