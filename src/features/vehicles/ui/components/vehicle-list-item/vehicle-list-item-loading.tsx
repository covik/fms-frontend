import { Grid } from './container';
import { Skeleton } from '@mui/material';
import { loading } from './selectors';

const IconSkeleton = (
  <Skeleton variant={'rounded'} width={'24px'} height={'24px'} />
);

export function VehicleListItemLoading() {
  return (
    <Grid data-testid={loading}>
      <div>{IconSkeleton}</div>
      <div>
        <Skeleton variant={'text'} width={'42%'} />
      </div>
      <div>{IconSkeleton}</div>
      <div>{IconSkeleton}</div>
    </Grid>
  );
}
