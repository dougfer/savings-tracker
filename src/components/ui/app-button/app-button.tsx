import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@gluestack-ui/themed';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

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

type AppButtonRootProps = Omit<ComponentProps<typeof Button>, 'size' | 'variant' | 'action'> & {
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
    effectiveDisabled ? 'opacity-40' : 'data-[active=true]:opacity-80',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AppButtonContext.Provider value={{ variant, size, isDisabled: effectiveDisabled, isLoading }}>
      <Button {...props} isDisabled={effectiveDisabled} className={cls}>
        {children}
      </Button>
    </AppButtonContext.Provider>
  );
}

function AppButtonText({ className, ...props }: ComponentProps<typeof ButtonText>) {
  const { variant, size } = useAppButtonCtx();
  const cls = ['font-sans-semibold', textVariantCls[variant], textSizeCls[size], className]
    .filter(Boolean)
    .join(' ');
  return <ButtonText {...props} className={cls} />;
}

function AppButtonIcon({ className, ...props }: ComponentProps<typeof ButtonIcon>) {
  const { variant } = useAppButtonCtx();
  const cls = [textVariantCls[variant], className].filter(Boolean).join(' ');
  return <ButtonIcon {...props} className={cls} />;
}

function AppButtonSpinner({ className, ...props }: ComponentProps<typeof ButtonSpinner>) {
  const { isLoading, variant } = useAppButtonCtx();
  if (!isLoading) return null;
  const cls = [textVariantCls[variant], className].filter(Boolean).join(' ');
  return <ButtonSpinner {...props} className={cls} />;
}

AppButtonRoot.displayName = 'AppButton';
AppButtonText.displayName = 'AppButton.Text';
AppButtonIcon.displayName = 'AppButton.Icon';
AppButtonSpinner.displayName = 'AppButton.Spinner';

export const AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Icon: AppButtonIcon,
  Spinner: AppButtonSpinner,
});
