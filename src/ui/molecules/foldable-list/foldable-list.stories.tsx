import { Cash, CreditCard } from 'mdi-material-ui';
import { FoldableList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Foldable List',
  component: FoldableList,
} satisfies Meta<typeof FoldableList>;
type Story = StoryObj<typeof FoldableList>;

const items = [
  {
    id: '1',
    label: 'Račun',
    value: 'Tekući',
    icon: <CreditCard />,
  },
  {
    id: '2',
    label: 'Saldo',
    value: '1234 €',
    icon: <Cash />,
  },
  {
    id: '3',
    label: 'Raspoloživo',
    value: '100 €',
    icon: <Cash />,
  },
];

const itemsWithoutIcon = items.map((item) => ({ ...item, icon: undefined }));
const itemsLoading = items.map((item) => ({ ...item, value: undefined }));

export const Expanded: Story = {
  args: {
    initialExpanded: true,
    items,
  },
};

export const ExpandedAndLoading: Story = {
  args: {
    ...Expanded.args,
    items: itemsLoading,
  },
};

export const Collapsed: Story = {
  args: {
    initialExpanded: false,
    items,
  },
};

export const CollapsedAndLoading: Story = {
  args: {
    ...Collapsed.args,
    items: itemsLoading,
  },
};

export const NoIcons: Story = {
  args: {
    ...Expanded.args,
    items: itemsWithoutIcon,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
