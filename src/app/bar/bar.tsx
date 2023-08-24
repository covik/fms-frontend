import {
  AppBar as RealAppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from 'mdi-material-ui';

export interface AppBarAttributes {
  onHamburgerClick: () => void;
}

export function AppBar({ onHamburgerClick }: AppBarAttributes) {
  return (
    <RealAppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ marginRight: 2 }}
          onClick={onHamburgerClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Zara Fleet
        </Typography>
      </Toolbar>
    </RealAppBar>
  );
}
