import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navigation } from './Navigation';
import { styled } from '@mui/material';

export default {
  title: 'Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Navigation>;

const StyledNavigation = styled(Navigation)({
  position: 'static',
});

const Template: ComponentStory<typeof Navigation> = () => <StyledNavigation />;

export const Rail = Template.bind({});
