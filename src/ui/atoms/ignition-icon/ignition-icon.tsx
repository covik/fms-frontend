import { LightningBolt } from 'mdi-material-ui';

export interface IgnitionIconAttributes {
  on: boolean;
}

export function IgnitionIcon({ on }: IgnitionIconAttributes) {
  const color = on ? 'green' : 'orange';

  return <LightningBolt htmlColor={color} />;
}
