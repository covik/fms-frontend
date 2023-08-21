import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionWarning,
} from './section';
import { AlertCircle as IconAlert } from 'mdi-material-ui';
import type { SectionAttributes } from './section';

export function SectionUnavailableVehicles({ children }: SectionAttributes) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Nedostupna</SectionTitle>
        <SectionWarning color={'warning'} icon={<IconAlert />}>
          Vozila koja se nisu javila preko 65 minuta. Prikazano je posljednje
          poznato stanje.
        </SectionWarning>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
