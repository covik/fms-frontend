import { Counter, MapMarkerDistance } from 'mdi-material-ui';
import { FoldableList } from '#ui/molecules/foldable-list';

export interface RouteDistanceSummaryAttributes {
  odometerStart: string | undefined;
  odometerEnd: string | undefined;
  total: string | undefined;
  initialExpanded?: boolean;
}

export function RouteDistanceSummary({
  odometerStart,
  odometerEnd,
  total,
  initialExpanded = false,
}: RouteDistanceSummaryAttributes) {
  const items = [
    {
      id: 'total',
      label: 'Prijeđena udaljenost',
      icon: <MapMarkerDistance />,
      value: total,
    },
    {
      id: 'odometer-start',
      label: 'Početni brojčanik',
      icon: <Counter />,
      value: odometerStart,
    },
    {
      id: 'odometer-end',
      label: 'Završni brojčanik',
      icon: <Counter />,
      value: odometerEnd,
    },
  ];

  return <FoldableList items={items} initialExpanded={initialExpanded} />;
}
