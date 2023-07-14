import { Navigation } from 'mdi-material-ui';

export interface MovementIconAttributes {
  moving: boolean;
}

export function MovementIcon({ moving }: MovementIconAttributes) {
  const color = moving ? 'green' : 'orange';

  return <Navigation htmlColor={color} />;
}
