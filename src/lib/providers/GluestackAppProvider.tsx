import { GluestackUIProvider } from '@gluestack-ui/themed';
import type { ReactNode } from 'react';

import { appGluestackConfig } from '@/lib/gluestack/gluestack-ui.config';

export function GluestackAppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <GluestackUIProvider config={appGluestackConfig}>{children}</GluestackUIProvider>;
}
