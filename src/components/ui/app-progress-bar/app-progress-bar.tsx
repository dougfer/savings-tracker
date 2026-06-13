/**
 * AppProgressBar — bar to visualize percentage progress (Pencil / design tokens).
 *
 * @example
 * <AppProgressBar value={60} size="md" variant="default" />
 *
 * @example
 * <AppProgressBar value={100} variant="success" label="Complete!" />
 *
 * @example
 * <AppProgressBar value={75} variant="default" label />
 *
 * @see specs/003-shared-ui-components/quickstart.md — ProgressBar
 */
import { Text, View, type ViewProps } from 'react-native';

type ProgressVariant = 'default' | 'success' | 'warning';
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

const trackHeightCls: Record<ProgressSize, string> = {
  xs: 'h-0.5',
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const fillVariantCls: Record<ProgressVariant, string> = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
};

type AppProgressBarProps = ViewProps & {
  value?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  label?: string | boolean;
  className?: string;
  trackClassName?: string;
  labelClassName?: string;
};

export function AppProgressBar({
  value = 0,
  size = 'md',
  variant = 'default',
  label,
  className,
  trackClassName,
  labelClassName,
  ...props
}: AppProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const rootCls = ['w-full bg-muted rounded-full overflow-hidden', trackHeightCls[size], className]
    .filter(Boolean)
    .join(' ');
  const trackCls = ['h-full rounded-full', fillVariantCls[variant], trackClassName]
    .filter(Boolean)
    .join(' ');
  const labelCls = ['text-body-sm text-muted-foreground', labelClassName]
    .filter(Boolean)
    .join(' ');

  const labelText = typeof label === 'string' ? label : `${clamped}%`;

  return (
    <View
      {...props}
      className={rootCls}
      role="progressbar"
      accessibilityRole="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <View className={trackCls} style={{ width: `${clamped}%` }} />
      {label !== undefined && <Text className={labelCls}>{labelText}</Text>}
    </View>
  );
}

AppProgressBar.displayName = 'AppProgressBar';
