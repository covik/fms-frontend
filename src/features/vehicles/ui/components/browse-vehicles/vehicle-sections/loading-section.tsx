import { Skeleton } from '@mui/material';
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
} from './section';
import type { SectionAttributes } from './section';

export function LoadingSection({ children }: SectionAttributes) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <Skeleton variant={'text'} width={'60px'} />
        </SectionTitle>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
