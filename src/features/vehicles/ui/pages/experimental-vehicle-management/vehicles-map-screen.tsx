import { AppMap, MapFetchIndicator } from '#core/map';
import { Content, Main, Page, Sidebar } from './layout';
import { VehiclesMap } from './map';
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
      <Main>
        <Content>
          <AppMap sx={{ height: '100%' }}>
            <VehiclesMap vehicles={vehicles ?? []} />
            {showRefreshIndicator ? <MapFetchIndicator /> : null}
          </AppMap>
        </Content>

        <Sidebar>
          <BrowseVehicles vehicles={vehicles} />
        </Sidebar>
      </Main>
    </Page>
  );
}
