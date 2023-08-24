import { useState } from 'react';
import { BottomControlPanel } from '../../components/bottom-control-panel';
import type { ReactNode } from 'react';

export interface ControlPanelAttributes {
  children: ReactNode;
}

export function ControlPanel({ children }: ControlPanelAttributes) {
  const [visible, setVisible] = useState(false);

  return (
    <BottomControlPanel visible={visible} onVisibilityChange={setVisible}>
      {children}
    </BottomControlPanel>
  );
}
