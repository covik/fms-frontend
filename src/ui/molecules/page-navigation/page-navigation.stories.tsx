import { Pound } from 'mdi-material-ui';
import { PageNavigation } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { NavigationItems } from '#ui/molecules';

const items = new Array(7).fill(undefined).map((_, index) => ({
  to: `irrelevant-url-${index + 1}`,
  label: `Item ${index + 1}`,
})) as unknown as NavigationItems;

const itemsWithIcons = items.map((item) => ({ ...item, icon: <Pound /> }));

export default {
  title: 'Molecules/Page Navigation',
  component: PageNavigation,
} satisfies Meta<typeof PageNavigation>;
type Story = StoryObj<typeof PageNavigation>;

export const Default: Story = {
  args: { items },
};

export const WithIcons: StoryObj = {
  args: {
    items: itemsWithIcons,
  },
};
