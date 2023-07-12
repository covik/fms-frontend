import { BedClock, CarClock, ClockOutline } from 'mdi-material-ui';
import { FoldableList } from '#ui/molecules/foldable-list';

export interface RouteDurationSummaryAttributes {
  driving: string | undefined;
  stopped: string | undefined;
  total: string | undefined;
  initialExpanded?: boolean;
}

export function RouteDurationSummary({
  driving,
  stopped,
  total,
  initialExpanded = false,
}: RouteDurationSummaryAttributes) {
  const items = [
    {
      id: 'total',
      label: 'Trajanje',
      icon: <ClockOutline />,
      value: total,
    },
    {
      id: 'driving',
      label: 'Vožnja',
      icon: <CarClock />,
      value: driving,
    },
    {
      id: 'stopped',
      label: 'Stajanje',
      icon: <BedClock />,
      value: stopped,
    },
  ];

  return <FoldableList items={items} initialExpanded={initialExpanded} />;
}
