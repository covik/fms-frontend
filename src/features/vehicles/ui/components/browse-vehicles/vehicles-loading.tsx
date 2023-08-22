import { VehicleListItemLoading } from './vehicle-list-item';
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
} from '../vehicle-sections/section';
import { Skeleton } from '@mui/material';

export function VehiclesLoading() {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <Skeleton variant={'text'} width={'60px'} />
        </SectionTitle>
      </SectionHeader>

      <SectionContent>
        <VehicleListItemLoading />
        <VehicleListItemLoading />
        <VehicleListItemLoading />
        <VehicleListItemLoading />
      </SectionContent>
    </Section>
  );
}
