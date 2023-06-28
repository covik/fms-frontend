import { LocationStateBlock } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Organisms/Location State Block',
  component: LocationStateBlock,
} satisfies Meta<typeof LocationStateBlock>;
type Story = StoryObj<typeof LocationStateBlock>;

export const Default: Story = {
  args: {
    altitude: '10 m',
    coordinates: '43.123456, 12.123456',
    course: 'Jugoistok',
    updatedAt: 'prije 1 sat',
  },
};
