import { useState } from 'react';
import { Car } from 'mdi-material-ui';
import { BottomControlPanel } from '../../components/bottom-control-panel';
import type { ReactNode } from 'react';

export interface ControlPanelAttributes {
  children: ReactNode;
}

export function ControlPanel({ children }: ControlPanelAttributes) {
  const [visible, setVisible] = useState(false);

  return (
    <BottomControlPanel
      bleeding={33}
      PullerIcon={<Car fontSize={'medium'} />}
      visible={visible}
      onVisibilityChange={setVisible}
    >
      {children}
    </BottomControlPanel>
  );
}
