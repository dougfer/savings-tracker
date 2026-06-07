import type { ComponentProps } from 'react';

import { Text } from 'react-native';

type AppTextProps = ComponentProps<typeof Text> & { className?: string };

/** Shared typography defaults for product copy (see `docs/style-guide.md`). */
export function AppText({ className, ...props }: Readonly<AppTextProps>) {
  const hasFontOverride = /\bfont-\S+/.test(className ?? '');
  const defaults = hasFontOverride ? 'text-foreground text-body' : 'font-sans text-foreground text-body';
  const mergedClass = [defaults, className].filter(Boolean).join(' ');
  return <Text {...props} className={mergedClass} />;
}
