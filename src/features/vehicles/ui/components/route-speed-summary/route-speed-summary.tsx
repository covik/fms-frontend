import { Speedometer, SpeedometerMedium } from 'mdi-material-ui';
import { FoldableList } from '#ui/molecules/foldable-list';

export interface RouteSpeedSummaryAttributes {
  average: string | undefined;
  max: string | undefined;
  initialExpanded?: boolean;
}

export function RouteSpeedSummary({
  average,
  max,
  initialExpanded = false,
}: RouteSpeedSummaryAttributes) {
  const items = [
    {
      id: 'max-speed',
      label: 'Najveća brzina',
      icon: <Speedometer />,
      value: max,
    },
    {
      id: 'average-speed',
      label: 'Prosječna brzina',
      icon: <SpeedometerMedium />,
      value: average,
    },
  ];

  return <FoldableList items={items} initialExpanded={initialExpanded} />;
}
