import { RouteFilter } from './RouteFilter';
import { Meta, StoryFn } from '@storybook/react';

export default {
  component: RouteFilter,
} as Meta<typeof RouteFilter>;

export const Today = {};

export const Yesterday = {
  args: {
    view: 'yesterday',
  },
};

export const Custom = {
  args: {
    view: 'custom',
  },
};
