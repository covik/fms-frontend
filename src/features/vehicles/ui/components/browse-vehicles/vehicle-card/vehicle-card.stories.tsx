import { faker } from '@faker-js/faker';
import { ShareVariant, Truck, TruckFast } from 'mdi-material-ui';
import {
  VehicleCard,
  VehicleCardAction,
  VehicleCardContent,
  VehicleCardHeader,
  VehicleCardIcon,
  VehicleCardTag,
  VehicleCardTags,
  VehicleCardTitle,
} from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type {
  VehicleCardActionAttributes,
  VehicleCardHeaderAttributes,
  VehicleCardIconAttributes,
  VehicleCardTitleAttributes,
} from '.';

/*
 These arguments are not component props
 because component embraces composition through children.
 They are needed for Storybook to be able to alter data in the UI
 */
interface ArtificialArguments {
  headerColor: VehicleCardHeaderAttributes['color'];
  title: VehicleCardTitleAttributes['children'];
  icon: VehicleCardIconAttributes['children'];
  action: VehicleCardActionAttributes['children'];
  content: string[];
}

const meta = {
  title: 'Molecules/Vehicle Card (New)',
  // @ts-expect-error
  component: VehicleCard,
  args: {
    title: 'My truck',
    headerColor: 'green',
  },
  argTypes: {
    icon: {
      options: ['Truck', 'TruckFast'],
      mapping: {
        Truck: <Truck />,
        TruckFast: <TruckFast />,
      },
    },
    action: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<ArtificialArguments>;
export default meta;

type Story<Args extends keyof ArtificialArguments = never> = StoryObj<
  Pick<ArtificialArguments, Args | keyof typeof meta.args>
>;

export const Default: Story = {
  render: (args) => (
    <VehicleCard>
      <VehicleCardHeader color={args.headerColor}>
        <VehicleCardTitle>{args.title}</VehicleCardTitle>
      </VehicleCardHeader>
    </VehicleCard>
  ),
};

export const Empty: Story = {
  // @ts-expect-error
  render: () => <VehicleCard />,
};

export const WithIcon: Story<'icon'> = {
  args: {
    ...Default.args,
    icon: <Truck fontSize={'large'} />,
  },
  render: (args) => (
    <VehicleCard>
      <VehicleCardHeader color={args.headerColor}>
        <VehicleCardTitle>{args.title}</VehicleCardTitle>
        <VehicleCardIcon>{args.icon}</VehicleCardIcon>
      </VehicleCardHeader>
    </VehicleCard>
  ),
};

export const WithAction: Story<'icon' | 'action'> = {
  args: {
    ...WithIcon.args,
    action: <ShareVariant htmlColor={'#000'} />,
  },
  render: (args) => (
    <VehicleCard>
      <VehicleCardHeader color={args.headerColor}>
        <VehicleCardTitle>{args.title}</VehicleCardTitle>
        <VehicleCardIcon>{args.icon}</VehicleCardIcon>
        <VehicleCardAction>{args.action}</VehicleCardAction>
      </VehicleCardHeader>
    </VehicleCard>
  ),
};

export const WithLongTitle: Story<'icon' | 'action'> = {
  ...WithAction,
  args: {
    ...WithAction.args,
    title: faker.word.words(20),
  },
};

export const WithTags: Story<'icon' | 'action' | 'content'> = {
  args: {
    ...WithAction.args,
    content: ['10 km/h', '25.6 V'],
  },
  render: (args) => (
    <VehicleCard>
      <VehicleCardHeader color={args.headerColor}>
        <VehicleCardTitle>{args.title}</VehicleCardTitle>
        <VehicleCardIcon>{args.icon}</VehicleCardIcon>
        <VehicleCardAction>{args.action}</VehicleCardAction>
      </VehicleCardHeader>
      <VehicleCardContent>
        <VehicleCardTags>
          {args.content.map((value) => (
            <VehicleCardTag key={value}>{value}</VehicleCardTag>
          ))}
        </VehicleCardTags>
      </VehicleCardContent>
    </VehicleCard>
  ),
};
