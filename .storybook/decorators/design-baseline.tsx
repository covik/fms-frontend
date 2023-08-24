import { DesignBaseline } from '#foundation/design-baseline';
import type { Decorator } from '@storybook/react';

export const withDesignBaseline: Decorator = (Story) => (
  <DesignBaseline>
    <Story />
  </DesignBaseline>
);
