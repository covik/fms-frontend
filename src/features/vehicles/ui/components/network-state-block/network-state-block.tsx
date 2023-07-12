import { Tile, TileListContent } from '#ui/molecules/tile';
import { ConnectionDelayListItem } from '../connection-delay-list-item';
import { ConnectionStatusListItem } from '../connection-status-list-item';

export interface NetworkStateBlockAttributes {
  active: boolean;
  latency: string;
}

export function NetworkStateBlock({
  active,
  latency,
}: NetworkStateBlockAttributes) {
  return (
    <Tile label={'Mreža'}>
      <TileListContent>
        <ConnectionStatusListItem active={active} />
        <ConnectionDelayListItem latency={latency} />
      </TileListContent>
    </Tile>
  );
}
