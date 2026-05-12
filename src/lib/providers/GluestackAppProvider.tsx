import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import type { ReactNode } from 'react';

export function GluestackAppProvider({ children }: { children: ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}
