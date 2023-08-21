import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

interface Layout {
  offsetBottom: string;
  offsetLeft: string;
  offsetTop: string;
}

const defaultValue = {
  offsetBottom: '0px',
  offsetLeft: '0px',
  offsetTop: '0px',
};

const LayoutContext = createContext<Layout>(defaultValue);

interface LayoutProviderAttributes extends Partial<Layout> {
  children: ReactNode;
}

export function LayoutProvider({
  children,
  offsetBottom = defaultValue.offsetBottom,
  offsetLeft = defaultValue.offsetLeft,
  offsetTop = defaultValue.offsetTop,
}: LayoutProviderAttributes) {
  const value = useMemo<Layout>(
    () => ({ offsetBottom, offsetLeft, offsetTop }),
    [offsetBottom, offsetLeft, offsetTop],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export function useLayout(): Layout {
  return useContext(LayoutContext);
}
