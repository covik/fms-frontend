import { LivePreviewView } from './LivePreviewView';
import { OperationalVehicle } from '../../../models/Vehicle';
import { locatedVehicleAttributes } from '../../../../cypress/fixtures/base-and-located-vehicle-attributes';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LivePreviewView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta<typeof LivePreviewView>;

type Story = StoryObj<typeof LivePreviewView>;

const operationalVehicle = new OperationalVehicle(locatedVehicleAttributes);

export const Default: Story = {
  args: {
    vehicle: operationalVehicle,
  },
};
