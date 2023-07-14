import { Skeleton, styled } from '@mui/material';
import type { RouteStopData } from '../../types/route';

const Table = styled('div')({});

const TableRow = styled('div')(({ theme }) => ({
  'display': 'grid',
  'gridTemplateColumns': '2.2rem 3.5rem 4rem auto',
  'gridAutoRows': 'auto',

  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '&:first-of-type > *': {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: '0',
    textTransform: 'uppercase',
  },
}));

const TableCell = styled('div')(({ theme }) => ({
  'fontSize': theme.typography.body2.fontSize,
  'lineHeight': theme.typography.body2.lineHeight,
  'padding': theme.spacing(1),
  'overflow': 'hidden',
  'whiteSpace': 'nowrap',
  'textOverflow': 'ellipsis',

  '&:nth-of-type(2), &:nth-of-type(3)': {
    textAlign: 'center',
  },
}));

const InlineSkeleton = styled(Skeleton)({
  display: 'inline-block',
});

export interface RouteStopsTableAttributes {
  stops: RouteStopData[] | undefined;
}

export function RouteStopsTable({ stops }: RouteStopsTableAttributes) {
  if (stops === undefined) return <RouteStopsLoading />;
  if (stops.length === 0) return null;

  return (
    <Table>
      <TableHeader />
      {stops.map((stop, index) => (
        <TableRow key={stop.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{stop.startTime}</TableCell>
          <TableCell>{stop.endTime}</TableCell>
          <TableCell>{stop.duration}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

function TableHeader() {
  return (
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Od</TableCell>
      <TableCell>Do</TableCell>
      <TableCell>Trajanje</TableCell>
    </TableRow>
  );
}

function RouteStopsLoading() {
  return (
    <Table>
      <TableHeader />
      {[1, 2, 3].map((id) => (
        <TableRow key={id}>
          <TableCell>
            <InlineSkeleton variant={'text'} width={'0.6rem'} />
          </TableCell>
          <TableCell>
            <InlineSkeleton variant={'text'} width={'2rem'} />
          </TableCell>
          <TableCell>
            <InlineSkeleton variant={'text'} width={'2rem'} />
          </TableCell>
          <TableCell>
            <InlineSkeleton variant={'text'} width={'2.7rem'} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
