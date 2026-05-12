import { Text } from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

type AppTextProps = ComponentProps<typeof Text>;

/** Shared typography defaults for product copy (see `docs/COMPONENT-TAXONOMY.md`). */
export function AppText(props: AppTextProps) {
  return <Text {...props} color={props.color ?? '$textLight900'} />;
}
