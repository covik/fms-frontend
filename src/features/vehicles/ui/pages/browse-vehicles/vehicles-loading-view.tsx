import { Skeleton } from '@mui/material';
import { SectionContent } from '../../components/vehicle-sections/section';

const vehicle = (
  <Skeleton variant={'rounded'} height={'76px'} component={'div'} />
);

export function VehiclesLoadingView() {
  return (
    <SectionContent>
      {vehicle}
      {vehicle}
      {vehicle}
      {vehicle}
    </SectionContent>
  );
}
