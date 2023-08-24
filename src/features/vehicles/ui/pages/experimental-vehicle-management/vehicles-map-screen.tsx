import { AppMap, MapFetchIndicator } from '#core/map';
import { FixedPage as Page } from '#ui/atoms/page';
import { VehiclesMap } from './map';
import { Content } from './content';
import { BrowseVehicles } from '../../components/browse-vehicles';
import type { Vehicles } from './types';

export interface VehicleMapScreenAttributes {
  vehicles: Vehicles | undefined;
  refreshingData: boolean;
}

export function VehiclesMapScreen({
  vehicles,
  refreshingData,
}: VehicleMapScreenAttributes) {
  const showRefreshIndicator = refreshingData && vehicles !== undefined;

  return (
    <Page>
      <AppMap sx={{ height: '100%' }}>
        <VehiclesMap vehicles={vehicles ?? []} />
        {showRefreshIndicator ? <MapFetchIndicator /> : null}
      </AppMap>

      <Content>
        <BrowseVehicles vehicles={vehicles} />
      </Content>
    </Page>
  );
}
