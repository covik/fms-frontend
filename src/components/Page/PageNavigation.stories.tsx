import { Pound } from 'mdi-material-ui';
import { PageNavigation } from './PageNavigation';
import { NavigationProvider, TabRender } from '../Navigation';
import type { Meta, StoryObj } from '@storybook/react';
import type { NavigationItems } from '../Navigation';

const items = new Array(7).fill(undefined).map((_, index) => ({
  to: `irrelevant-url-${index + 1}`,
  label: `Item ${index + 1}`,
})) as unknown as NavigationItems;

const itemsWithIcons = items.map((item) => ({ ...item, icon: <Pound /> }));

export default {
  component: PageNavigation,
  render: (args) => (
    <NavigationProvider items={items} activeItem={undefined}>
      <PageNavigation {...args} />
    </NavigationProvider>
  ),
  args: {
    itemRenderer: TabRender,
  },
  argTypes: {
    itemRenderer: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof PageNavigation>;
type Story = StoryObj<typeof PageNavigation>;

export const LabelsOnly: Story = {
  render: (args) => (
    <NavigationProvider items={items} activeItem={items[3]}>
      <PageNavigation {...args} />
    </NavigationProvider>
  ),
};

export const LabelsWithIcons: StoryObj = {
  render: (args) => (
    <NavigationProvider items={itemsWithIcons} activeItem={items[3]}>
      <PageNavigation {...args} />
    </NavigationProvider>
  ),
};
