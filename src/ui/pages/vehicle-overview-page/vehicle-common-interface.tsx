import { PageTitle } from '#ui/atoms';
import { VehicleNavigation } from '#ui/molecules';
import { PageHeader, PageLayout } from '#ui/templates/vehicle-layout';
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
