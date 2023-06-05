import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
} from './Section';
import { areChildrenNonEmptyArray } from '../../../utils/react';
import type { SectionAttributes } from './Section';

export function SectionOperationalVehicles({ children }: SectionAttributes) {
  if (!areChildrenNonEmptyArray(children)) return null;

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Aktivna</SectionTitle>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
