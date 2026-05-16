import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@gluestack-ui/themed';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

type CheckboxSize = 'sm' | 'md' | 'lg';

type AppCheckboxCtx = {
  size: CheckboxSize;
  isDisabled: boolean;
  isInvalid: boolean;
};

const AppCheckboxContext = createContext<AppCheckboxCtx | null>(null);

function useAppCheckboxCtx(): AppCheckboxCtx {
  const ctx = useContext(AppCheckboxContext);
  if (!ctx) throw new Error('AppCheckbox subcomponents must be used inside <AppCheckbox>');
  return ctx;
}

const indicatorSizeCls: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const labelSizeCls: Record<CheckboxSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
  lg: 'text-body',
};

type AppCheckboxRootProps = Omit<ComponentProps<typeof Checkbox>, 'size'> & {
  size?: CheckboxSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
  children?: ReactNode;
};

function AppCheckboxRoot({
  size = 'md',
  isDisabled = false,
  isInvalid = false,
  className,
  children,
  ...props
}: AppCheckboxRootProps) {
  const cls = ['flex-row items-center gap-2', isDisabled ? 'opacity-40' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <AppCheckboxContext.Provider value={{ size, isDisabled, isInvalid }}>
      <Checkbox {...props} isDisabled={isDisabled} isInvalid={isInvalid} className={cls}>
        {children}
      </Checkbox>
    </AppCheckboxContext.Provider>
  );
}

function AppCheckboxIndicator({ className, ...props }: ComponentProps<typeof CheckboxIndicator>) {
  const { size, isInvalid } = useAppCheckboxCtx();
  const cls = [
    'border-2 border-input rounded-sm items-center justify-center',
    'data-[checked=true]:bg-primary data-[checked=true]:border-primary',
    'data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-ring',
    indicatorSizeCls[size],
    isInvalid ? 'border-destructive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <CheckboxIndicator {...props} className={cls} />;
}

function AppCheckboxIcon({ className, ...props }: ComponentProps<typeof CheckboxIcon>) {
  const cls = ['text-primary-foreground', className].filter(Boolean).join(' ');
  return <CheckboxIcon {...props} className={cls} />;
}

function AppCheckboxLabel({ className, ...props }: ComponentProps<typeof CheckboxLabel>) {
  const { size } = useAppCheckboxCtx();
  const cls = ['text-foreground', labelSizeCls[size], className].filter(Boolean).join(' ');
  return <CheckboxLabel {...props} className={cls} />;
}

AppCheckboxRoot.displayName = 'AppCheckbox';
AppCheckboxIndicator.displayName = 'AppCheckbox.Indicator';
AppCheckboxIcon.displayName = 'AppCheckbox.Icon';
AppCheckboxLabel.displayName = 'AppCheckbox.Label';

export const AppCheckbox = Object.assign(AppCheckboxRoot, {
  Indicator: AppCheckboxIndicator,
  Icon: AppCheckboxIcon,
  Label: AppCheckboxLabel,
});
