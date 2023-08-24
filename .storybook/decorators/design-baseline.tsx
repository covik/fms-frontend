import { DesignBaseline } from '#app/design-baseline';
import type { Decorator } from '@storybook/react';

export const withDesignBaseline: Decorator = (Story) => (
  <DesignBaseline>
    <Story />
  </DesignBaseline>
);
