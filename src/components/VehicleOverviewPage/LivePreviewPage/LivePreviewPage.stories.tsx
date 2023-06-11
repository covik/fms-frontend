import { faker } from '@faker-js/faker';
import { LivePreviewView } from './LivePreviewView';
import { createOperationalVehicle } from '../../../models/Vehicle/factory';
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

faker.seed(2);
const operationalVehicle = createOperationalVehicle({ faker });

export const Default: Story = {
  args: {
    vehicle: operationalVehicle,
  },
};
