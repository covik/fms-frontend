import { DesignBaseline } from '#app';
import type { Decorator } from '@storybook/react';

export const withDesignBaseline: Decorator = (Story) => (
  <DesignBaseline>
    <Story />
  </DesignBaseline>
);
