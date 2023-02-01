import {
  Divider,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  useTheme,
} from '@mui/material';
import { all as items } from './items';
import logo from '../../assets/logo.svg';

export function Navigation() {
  const theme = useTheme();

  const logoSize = 34;
  const logoSpacing = theme.spacing(1);
  const itemSpacing = theme.spacing(2);

  return (
    <Drawer anchor="left" variant="permanent">
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
    </Drawer>
  );
}
