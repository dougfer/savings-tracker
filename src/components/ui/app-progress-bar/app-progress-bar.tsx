import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

import { Text } from 'react-native';

import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';

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

type AppProgressBarRootProps = Omit<ComponentProps<typeof Progress>, 'value'> & {
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
  const cls = ['w-full bg-muted rounded-full', trackHeightCls[size], className]
    .filter(Boolean)
    .join(' ');
  return (
    <AppProgressBarContext.Provider value={{ value: clamped, variant, size }}>
      <Progress
        {...props}
        value={clamped}
        className={cls}
        accessibilityRole="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {children}
      </Progress>
    </AppProgressBarContext.Provider>
  );
}

function AppProgressBarTrack({ className, ...props }: ComponentProps<typeof ProgressFilledTrack>) {
  const { variant } = useAppProgressBarCtx();
  const cls = ['h-full rounded-full', fillVariantCls[variant], className].filter(Boolean).join(' ');
  return <ProgressFilledTrack {...props} className={cls} />;
}

type AppProgressBarLabelProps = ComponentProps<typeof Text> & { className?: string };

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
