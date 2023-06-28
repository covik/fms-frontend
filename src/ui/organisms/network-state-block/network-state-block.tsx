import {
  ConnectionDelayListItem,
  ConnectionStatusListItem,
  Tile,
  TileListContent,
} from '#ui/molecules';

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
