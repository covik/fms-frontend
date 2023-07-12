import { PageTitle } from '#ui/atoms/page-title';
import { VehicleNavigation } from '../../components/vehicle-navigation';
import {
  PageHeader,
  PageLayout,
} from '../../templates/single-vehicle-tracking';
import type { ReactNode } from 'react';

export interface VehicleCommonInterfaceAttributes {
  id: string;
  name: string;
  children: ReactNode;
}

export function VehicleCommonInterface({
  id,
  name,
  children,
}: VehicleCommonInterfaceAttributes) {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>{name}</PageTitle>
        <VehicleNavigation vehicleId={id} />
      </PageHeader>
      {children}
    </PageLayout>
  );
}
