import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Map } from '../../Map';
import {
  BedClock,
  CarClock,
  ChevronDown,
  ChevronUp,
  ClockOutline,
  MapMarkerDistance,
  Speedometer,
  SpeedometerMedium,
} from 'mdi-material-ui';
import type { ReactNode } from 'react';

export function TodayRoutePage() {
  const spacing = 1;

  return (
    <Grid container direction="row" flex={1} spacing={spacing}>
      <Grid item xs={12} md={4} lg={3} xl={2} position={'relative'}>
        <Box
          sx={(theme) => ({
            position: {
              md: 'absolute',
              xs: 'static',
            },
            top: theme.spacing(spacing),
            bottom: 0,
            left: theme.spacing(spacing),
            right: 0,
            overflow: 'auto',
            paddingBottom: '2px', // otherwise card box shadow is invisible
          })}
        >
          <Stack spacing={2}>
            <Tile label={'Sažetak'}>
              <Summary />
            </Tile>
            <Tile label={'Zaustavljanje'}>
              <CardContent>
                <StopsTable />
              </CardContent>
            </Tile>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9} xl={10}>
        <Card
          sx={{
            height: '100%',
            padding: 1,
            minHeight: { xs: '40vmax', lg: 'auto' },
          }}
        >
          <Map width={'100%'} height={'100%'} x={45} y={12} z={8} />
        </Card>
      </Grid>
    </Grid>
  );
}

export interface TileAttributes {
  label: string;
  children: ReactNode;
}

function Tile({ label, children }: TileAttributes) {
  return (
    <Card>
      <CardHeader
        title={label}
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 500,
        }}
        sx={{ paddingBottom: 0 }}
      />
      {children}
    </Card>
  );
}

function Summary() {
  const [timeDetailsOpen, setTimeDetailsOpen] = useState(false);
  const [speedDetailsOpen, setSpeedDetailsOpen] = useState(false);

  function toggleTimeDetails() {
    setTimeDetailsOpen(!timeDetailsOpen);
  }

  function toggleSpeedDetails() {
    setSpeedDetailsOpen(!speedDetailsOpen);
  }

  return (
    <>
      <List disablePadding dense>
        <ListItemButton onClick={toggleTimeDetails}>
          <ListItemIcon>
            <ClockOutline />
          </ListItemIcon>
          <ListItemText primary="Trajanje" secondary="9h 45m" />
          {timeDetailsOpen ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>

        <Collapse in={timeDetailsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem>
              <ListItemIcon>
                <CarClock />
              </ListItemIcon>
              <ListItemText primary="Vožnja" secondary="9h" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BedClock />
              </ListItemIcon>
              <ListItemText primary="Stajanje" secondary="45min" />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List disablePadding dense>
        <ListItem>
          <ListItemIcon>
            <MapMarkerDistance />
          </ListItemIcon>
          <ListItemText primary="Prijeđena udaljenost" secondary="270 km" />
        </ListItem>
      </List>

      <Divider />

      <List disablePadding dense>
        <ListItemButton onClick={toggleSpeedDetails}>
          <ListItemIcon>
            <Speedometer />
          </ListItemIcon>
          <ListItemText primary="Najveća brzina" secondary="92 km/h" />
          {timeDetailsOpen ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>

        <Collapse in={speedDetailsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem>
              <ListItemIcon>
                <SpeedometerMedium />
              </ListItemIcon>
              <ListItemText primary="Prosječna brzina" secondary="80 km/h" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}

function StopsTable() {
  const theme = useTheme();

  return (
    <Table
      size={'small'}
      sx={{
        '& .MuiTableCell-root': {
          paddingX: 1,
        },
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            '& .MuiTableCell-root': {
              paddingBottom: '0 !important',
              textTransform: 'uppercase',
              color: `${theme.palette.text.secondary} !important`,
            },
          }}
        >
          <TableCell sx={{ width: '30px' }}>#</TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            Od
          </TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            Do
          </TableCell>
          <TableCell>Trajanje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ '& .MuiTableCell-root': { color: 'text.primary' } }}>
        <TableRow>
          <TableCell sx={{ width: '30px' }}>1</TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            01:10
          </TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            08:10
          </TableCell>
          <TableCell>7h</TableCell>
        </TableRow>

        <TableRow>
          <TableCell sx={{ width: '30px' }}>2</TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            13:00
          </TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            15:12
          </TableCell>
          <TableCell>2h 12m</TableCell>
        </TableRow>

        <TableRow sx={{ '&:last-of-type td': { border: 0 } }}>
          <TableCell sx={{ width: '30px' }}>3</TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            16:20
          </TableCell>
          <TableCell align={'center'} sx={{ width: '60px' }}>
            18:11
          </TableCell>
          <TableCell>1h 51m</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
