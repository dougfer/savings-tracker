import { createContext, useContext, type ReactNode } from 'react';

import { Text, View, type TextProps, type ViewProps } from 'react-native';

type ProgressVariant = 'default' | 'success' | 'warning';
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

type AppProgressBarCtx = {
  value: number;
  variant: ProgressVariant;
  size: ProgressSize;
};

const AppProgressBarContext = createContext<AppProgressBarCtx | null>(null);

function useAppProgressBarCtx(): AppProgressBarCtx {
  const ctx = useContext(AppProgressBarContext);
  if (!ctx) throw new Error('AppProgressBar subcomponents must be used inside <AppProgressBar>');
  return ctx;
}

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

type AppProgressBarRootProps = ViewProps & {
  value?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  className?: string;
  children?: ReactNode;
};

function AppProgressBarRoot({
  value = 0,
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}: AppProgressBarRootProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const cls = ['w-full bg-muted rounded-full overflow-hidden', trackHeightCls[size], className]
    .filter(Boolean)
    .join(' ');
  return (
    <AppProgressBarContext.Provider value={{ value: clamped, variant, size }}>
      <View
        {...props}
        className={cls}
        role="progressbar"
        accessibilityRole="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {children}
      </View>
    </AppProgressBarContext.Provider>
  );
}

type AppProgressBarTrackProps = ViewProps & { className?: string };

function AppProgressBarTrack({ className, style, ...props }: AppProgressBarTrackProps) {
  const { variant, value } = useAppProgressBarCtx();
  const cls = ['h-full rounded-full', fillVariantCls[variant], className].filter(Boolean).join(' ');
  return <View {...props} className={cls} style={[{ width: `${value}%` }, style]} />;
}

type AppProgressBarLabelProps = TextProps & { className?: string };

function AppProgressBarLabel({ className, children, ...props }: AppProgressBarLabelProps) {
  const { value } = useAppProgressBarCtx();
  const cls = ['text-body-sm text-muted-foreground', className].filter(Boolean).join(' ');
  return (
    <Text {...props} className={cls}>
      {children ?? `${value}%`}
    </Text>
  );
}

AppProgressBarRoot.displayName = 'AppProgressBar';
AppProgressBarTrack.displayName = 'AppProgressBar.Track';
AppProgressBarLabel.displayName = 'AppProgressBar.Label';

export const AppProgressBar = Object.assign(AppProgressBarRoot, {
  Track: AppProgressBarTrack,
  Label: AppProgressBarLabel,
});
