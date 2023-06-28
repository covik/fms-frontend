import { Pound } from 'mdi-material-ui';
import { NavigationProvider, TabRender } from '#ui/molecules';
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
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof PageNavigation>;
type Story = StoryObj<typeof PageNavigation>;

export const Default: Story = {
  render: (args) => (
    <NavigationProvider items={items} activeItem={items[3]}>
      <PageNavigation {...args} />
    </NavigationProvider>
  ),
};

export const WithIcons: StoryObj = {
  render: (args) => (
    <NavigationProvider items={itemsWithIcons} activeItem={items[3]}>
      <PageNavigation {...args} />
    </NavigationProvider>
  ),
};
