import { createContext, useContext, type ReactNode } from 'react';

import { Pressable, Text, View, type PressableProps, type TextProps, type ViewProps } from 'react-native';

import { createCheckbox } from '@gluestack-ui/core/checkbox/creator';
import { cssInterop } from 'nativewind';

import { withStates } from '@/lib/gluestack/with-states-interop';

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const StyledRoot = withStates(Pressable);
const StyledIndicator = withStates(View);
const StyledIcon = withStates(View);
const StyledLabel = withStates(Text);
const StyledGroup = withStates(View);

const UICheckbox = createCheckbox({
  Root: StyledRoot,
  Indicator: StyledIndicator,
  Icon: StyledIcon,
  Label: StyledLabel,
  Group: StyledGroup,
});

cssInterop(UICheckbox, { className: 'style' } as any);
cssInterop(UICheckbox.Indicator, { className: 'style' } as any);
cssInterop(UICheckbox.Icon, { className: 'style' } as any);
cssInterop(UICheckbox.Label, { className: 'style' } as any);

// ---------------------------------------------------------------------------
// Variant / size maps
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type AppCheckboxRootProps = Omit<PressableProps, 'children'> & {
  size?: CheckboxSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  value: string;
  isChecked?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (isSelected: boolean) => void;
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
  const cls = [
    'flex-row items-center gap-2',
    'data-[disabled=true]:opacity-40',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AppCheckboxContext.Provider value={{ size, isDisabled, isInvalid }}>
      <UICheckbox
        {...(props as any)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={cls}
      >
        {children}
      </UICheckbox>
    </AppCheckboxContext.Provider>
  );
}

function AppCheckboxIndicator({ className, ...props }: ViewProps & { className?: string }) {
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
  return <UICheckbox.Indicator {...(props as any)} className={cls} />;
}

function AppCheckboxIcon({
  className,
  as: AsIcon,
  ...props
}: ViewProps & { className?: string; as: React.ComponentType<any> }) {
  const cls = ['text-primary-foreground', className].filter(Boolean).join(' ');
  return <UICheckbox.Icon {...(props as any)} as={AsIcon} className={cls} />;
}

function AppCheckboxLabel({ className, ...props }: TextProps & { className?: string }) {
  const { size } = useAppCheckboxCtx();
  const cls = ['text-foreground', labelSizeCls[size], className].filter(Boolean).join(' ');
  return <UICheckbox.Label {...(props as any)} className={cls} />;
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppCheckboxRoot.displayName = 'AppCheckbox';
AppCheckboxIndicator.displayName = 'AppCheckbox.Indicator';
AppCheckboxIcon.displayName = 'AppCheckbox.Icon';
AppCheckboxLabel.displayName = 'AppCheckbox.Label';

export const AppCheckbox = Object.assign(AppCheckboxRoot, {
  Indicator: AppCheckboxIndicator,
  Icon: AppCheckboxIcon,
  Label: AppCheckboxLabel,
});
