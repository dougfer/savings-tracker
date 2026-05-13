import { Text } from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

type AppTextProps = ComponentProps<typeof Text>;

/** Shared typography defaults for product copy (see `docs/style-guide.md`). */
export function AppText({ className, color, ...props }: Readonly<AppTextProps>) {
  const mergedClass = ['font-sans text-foreground text-body', className].filter(Boolean).join(' ');
  const colorProps = color === undefined || color === null ? {} : { color };
  return <Text {...props} {...colorProps} className={mergedClass} />;
}
