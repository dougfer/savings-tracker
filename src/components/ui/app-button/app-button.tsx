import { createContext, useContext, type ReactNode } from 'react';

import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
} from 'react-native';

import { createButton } from '@gluestack-ui/core/button/creator';
import { cssInterop } from 'nativewind';

import { withStates } from '@/lib/gluestack/with-states-interop';

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const StyledRoot = withStates(Pressable);
const StyledText = withStates(Text);
const StyledGroup = withStates(View);
const StyledSpinner = withStates(ActivityIndicator);
const StyledIcon = withStates(View);

const UIButton = createButton({
  Root: StyledRoot,
  Text: StyledText,
  Group: StyledGroup,
  Spinner: StyledSpinner,
  Icon: StyledIcon,
});

cssInterop(UIButton, { className: 'style' } as any);
cssInterop(UIButton.Text, { className: 'style' } as any);
cssInterop(UIButton.Spinner, { className: 'style' } as any);
cssInterop(UIButton.Icon, { className: 'style' } as any);

// ---------------------------------------------------------------------------
// Variant / size maps
// ---------------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type AppButtonCtx = {
  variant: ButtonVariant;
  size: ButtonSize;
  isDisabled: boolean;
  isLoading: boolean;
};

const AppButtonContext = createContext<AppButtonCtx | null>(null);

function useAppButtonCtx(): AppButtonCtx {
  const ctx = useContext(AppButtonContext);
  if (!ctx) throw new Error('AppButton subcomponents must be used inside <AppButton>');
  return ctx;
}

const rootVariantCls: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  outline: 'bg-transparent border border-border',
  destructive: 'bg-destructive',
};

const rootSizeCls: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 min-h-[36px]',
  md: 'px-4 py-2.5 min-h-[44px]',
  lg: 'px-5 py-3 min-h-[52px]',
};

const textVariantCls: Record<ButtonVariant, string> = {
  primary: 'text-primary-foreground',
  secondary: 'text-secondary-foreground',
  outline: 'text-foreground',
  destructive: 'text-destructive-foreground',
};

const textSizeCls: Record<ButtonSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
  lg: 'text-body',
};

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type AppButtonRootProps = Omit<PressableProps, 'children'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
};

function AppButtonRoot({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  className,
  children,
  ...props
}: AppButtonRootProps) {
  const effectiveDisabled = isDisabled || isLoading;
  const cls = [
    'flex-row items-center justify-center rounded-xl',
    rootVariantCls[variant],
    rootSizeCls[size],
    'data-[disabled=true]:opacity-40 data-[active=true]:opacity-80',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AppButtonContext.Provider value={{ variant, size, isDisabled: effectiveDisabled, isLoading }}>
      <UIButton {...(props as any)} isDisabled={effectiveDisabled} className={cls}>
        {children}
      </UIButton>
    </AppButtonContext.Provider>
  );
}

function AppButtonText({ className, ...props }: TextProps & { className?: string }) {
  const { variant, size } = useAppButtonCtx();
  const cls = ['font-sans-semibold', textVariantCls[variant], textSizeCls[size], className]
    .filter(Boolean)
    .join(' ');
  return <UIButton.Text {...(props as any)} className={cls} />;
}

type AppButtonIconProps = {
  as: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
};

function AppButtonIcon({ as: AsIcon, className }: AppButtonIconProps) {
  const { variant } = useAppButtonCtx();
  if (!AsIcon) return null;
  return <AsIcon size={16} className={[textVariantCls[variant], className].filter(Boolean).join(' ')} />;
}

function AppButtonSpinner({ className, ...props }: { className?: string; color?: string }) {
  const { isLoading, variant } = useAppButtonCtx();
  if (!isLoading) return null;
  const cls = [textVariantCls[variant], className].filter(Boolean).join(' ');
  return <UIButton.Spinner {...(props as any)} className={cls} />;
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppButtonRoot.displayName = 'AppButton';
AppButtonText.displayName = 'AppButton.Text';
AppButtonIcon.displayName = 'AppButton.Icon';
AppButtonSpinner.displayName = 'AppButton.Spinner';

export const AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Icon: AppButtonIcon,
  Spinner: AppButtonSpinner,
});
