import type { ComponentProps } from 'react';

import { Text } from 'react-native';

type AppTextProps = ComponentProps<typeof Text> & { className?: string };

/** Shared typography defaults for product copy (see `docs/style-guide.md`). */
export function AppText({ className, ...props }: Readonly<AppTextProps>) {
  const mergedClass = ['font-sans text-foreground text-body', className].filter(Boolean).join(' ');
  return <Text {...props} className={mergedClass} />;
}
