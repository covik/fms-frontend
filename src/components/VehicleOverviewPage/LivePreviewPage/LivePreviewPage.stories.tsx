import { faker } from '@faker-js/faker';
import { LivePreviewView } from './LivePreviewView';
import { FixedPage } from '../../Page';
import {
  createDisabledVehicle,
  createOperationalVehicle,
  createUnavailableVehicle,
} from '../../../models/Vehicle/factory';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: LivePreviewView,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <FixedPage>
        <Story />
      </FixedPage>
    ),
  ],
} satisfies Meta<typeof LivePreviewView>;

type Story = StoryObj<typeof LivePreviewView>;

faker.seed(2);
const operationalVehicle = createOperationalVehicle({ faker });
const unavailableVehicle = createUnavailableVehicle({ faker });
const disabledVehicle = createDisabledVehicle({ faker });

export const Default: Story = {
  args: {
    vehicle: operationalVehicle,
  },
};

export const WarningOutdatedInformation: Story = {
  args: {
    vehicle: unavailableVehicle,
  },
};

export const WarningDisabledVehicle: Story = {
  args: {
    vehicle: disabledVehicle,
  },
};
