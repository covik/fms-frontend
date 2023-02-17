import { Tab, Tabs } from '@mui/material';
import { all as items } from './items';

export function Navigation() {
  return (
    <Tabs variant="fullWidth" value={0}>
      {items.map(({ id, title, icon }) => (
        <Tab key={id} label={title} icon={icon} />
      ))}
    </Tabs>
  );
}
