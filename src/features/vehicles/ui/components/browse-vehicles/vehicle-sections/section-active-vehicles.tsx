import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
} from './section';
import type { SectionAttributes } from './section';

export function SectionActiveVehicles({ children }: SectionAttributes) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Aktivna</SectionTitle>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
