import {
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tab,
  Tabs,
  Tooltip,
  useTheme,
} from '@mui/material';
import { all as items } from './items';
import logo from '../../assets/logo.svg';

export function Navigation({ bar = false }) {
  const theme = useTheme();

  if (bar) {
    return (
      <Tabs variant="fullWidth">
        {items.map(({ id, title, icon }) => (
          <Tab key={id} label={title} icon={icon} />
        ))}
      </Tabs>
    );
  }

  const logoSize = 34;
  const logoSpacing = theme.spacing(1);
  const itemSpacing = theme.spacing(2);

  return (
    <List disablePadding>
      <ListItem sx={{ padding: logoSpacing, justifyContent: 'center' }}>
        <img src={logo} alt="logo" width={logoSize} />
      </ListItem>
      <Divider />
      {items.map(({ id, title, icon }) => (
        <ListItem key={id} disablePadding>
          <Tooltip title={title} placement="right" TransitionComponent={Fade}>
            <ListItemButton
              href="#"
              sx={{ padding: itemSpacing, justifyContent: 'center' }}
            >
              <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
}
