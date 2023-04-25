import { Skeleton } from '@mui/material';
import { spaceBetweenItems } from '../VehicleList/';

const height = '76px';
const sx = { marginTop: spaceBetweenItems };

const pageTitle = <Skeleton variant={'text'} width={'150px'} height={'48px'} />;

const vehicle = <Skeleton variant={'rounded'} height={height} sx={sx} />;

export function VehiclesDigestSkeleton() {
  return (
    <>
      {pageTitle}
      {vehicle}
      {vehicle}
      {vehicle}
      {vehicle}
    </>
  );
}
