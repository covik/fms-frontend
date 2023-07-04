import { CourseListItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Course List Item',
  component: CourseListItem,
} satisfies Meta<typeof CourseListItem>;
type Story = StoryObj<typeof CourseListItem>;

export const Default: Story = {
  args: {
    course: 'Sjeveroistok',
  },
};
