import { Skeleton, Stack } from '@mui/material';
import { PageTitleSkeleton } from '#ui/atoms/page-title';

const vehicle = <Skeleton variant={'rounded'} height={'76px'} />;

export function VehiclesLoadingView() {
  return (
    <>
      <PageTitleSkeleton />
      <Stack spacing={2} marginTop={2}>
        {vehicle}
        {vehicle}
        {vehicle}
        {vehicle}
      </Stack>
    </>
  );
}
