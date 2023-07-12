import { withMap } from '#storybook/decorators';
import { RouteCheckpoints } from './route-checkpoints';
import { mapSettings } from './storybook-shared-settings';
import checkpoints from '../../../fixtures/view/route-positions';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Route Checkpoints',
  component: RouteCheckpoints,
  decorators: [withMap(mapSettings)],
  args: {
    checkpoints,
    color: '#dd0000',
  },
  argTypes: {
    selectedCheckpointId: {
      control: { type: 'select' },
      options: checkpoints.map((_, index) => index + 1),
      mapping: Object.fromEntries(
        checkpoints.map((checkpoint, index) => [index + 1, checkpoint.id]),
      ),
    },
    color: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof RouteCheckpoints>;
type Story = StoryObj<typeof RouteCheckpoints>;

export const Default: Story = {
  args: {
    checkpoints,
  },
};

export const CheckpointSelected: Story = {
  args: {
    checkpoints,
    selectedCheckpointId: checkpoints[0].id,
  },
};
