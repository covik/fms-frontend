import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionWarning,
} from './section';
import { AlertCircle as IconAlert } from 'mdi-material-ui';
import { areChildrenNonEmptyArray } from '../../../../../utils/react';
import type { SectionAttributes } from './section';

export function SectionUnavailableVehicles({ children }: SectionAttributes) {
  if (!areChildrenNonEmptyArray(children)) return null;

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Nedostupna</SectionTitle>
        <SectionWarning color={'warning'} icon={<IconAlert />}>
          Ova vozila nisu javila poziciju više od 65 minuta. Prikazano stanje
          vozila možda nije u skladu sa stvarnim stanjem.
        </SectionWarning>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
