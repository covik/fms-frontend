import { ComponentMeta } from '@storybook/react';
import { Navigation as NavigationComponent } from './Navigation';

export default {
  component: NavigationComponent,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof NavigationComponent>;

export const Navigation = () => <NavigationComponent />;
