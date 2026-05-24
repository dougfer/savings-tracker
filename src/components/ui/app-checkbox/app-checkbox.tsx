/**
 * AppCheckbox — Gluestack `createCheckbox` + estilos Pencil (`app.pen` node Q5Ei9).
 * Estado (checked, disabled, focus, hover) vem do creator; subparts: `Indicator`, `Label`.
 *
 * @example
 * <AppCheckbox value="terms" isChecked={agreed} onChange={setAgreed}>
 *   <AppCheckbox.Indicator />
 *   <AppCheckbox.Label>I agree to the terms</AppCheckbox.Label>
 * </AppCheckbox>
 *
 * @see specs/003-shared-ui-components/quickstart.md — Checkbox
 */
import { type ReactNode } from 'react';

import { Pressable, Text, View, type PressableProps, type TextProps, type ViewProps } from 'react-native';

import { createCheckbox } from '@gluestack-ui/core/checkbox/creator';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

import { withStates } from '@/lib/gluestack/with-states-interop';
import { pencilFocusRingNoBgClasses, pencilFocusRingWithBgClasses } from '@/lib/nativewind/pencil-focus-ring';

// ---------------------------------------------------------------------------
// Gluestack Checkbox (headless)
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
// Pencil styles (Q5Ei9)
// ---------------------------------------------------------------------------

export const appCheckboxRootVariants = tva({
  base: [
    'flex-row items-center gap-2',
    'data-[disabled=true]:opacity-50',
    'data-[focus-visible=true]:outline-none',
  ].join(' '),
});

export const appCheckboxIndicatorVariants = tva({
  base: [
    'h-4 w-4 shrink-0 items-center justify-center rounded-full border border-neutral-500',
    pencilFocusRingNoBgClasses,
  ].join(' '),
});

const CHECKBOX_DOT_CLASS = 'h-2 w-2 rounded-full bg-orange-400';

export const appCheckboxLabelClassName = 'font-sans-medium text-body text-neutral-300 user-select-none';

// ---------------------------------------------------------------------------
// Compound wrappers (className only)
// ---------------------------------------------------------------------------

type AppCheckboxRootProps = Omit<PressableProps, 'children'> & {
  value: string;
  isChecked?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (isSelected: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isIndeterminate?: boolean;
  isReadOnly?: boolean;
  className?: string;
  children?: ReactNode;
};

function AppCheckboxRoot({ className, children, ...props }: AppCheckboxRootProps) {
  const cls = appCheckboxRootVariants({ class: className });
  return (
    <UICheckbox
      {...(props as any)}
      className={cls}
      accessibilityRole="checkbox"
    >
      {children}
    </UICheckbox>
  );
}

type AppCheckboxIndicatorProps = ViewProps & { className?: string };

function AppCheckboxIndicator({ className, ...props }: AppCheckboxIndicatorProps) {
  const cls = appCheckboxIndicatorVariants({ class: className });
  return (
    <UICheckbox.Indicator {...(props as any)} className={cls}>
      <UICheckbox.Icon>
        <View testID="app-checkbox-dot" className={CHECKBOX_DOT_CLASS} />
      </UICheckbox.Icon>
    </UICheckbox.Indicator>
  );
}

type AppCheckboxLabelProps = TextProps & { className?: string };

function AppCheckboxLabel({ className, ...props }: AppCheckboxLabelProps) {
  const cls = [appCheckboxLabelClassName, className].filter(Boolean).join(' ');
  return <UICheckbox.Label {...(props as any)} className={cls} selectable={false} />;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

AppCheckboxRoot.displayName = 'AppCheckbox';
AppCheckboxIndicator.displayName = 'AppCheckbox.Indicator';
AppCheckboxLabel.displayName = 'AppCheckbox.Label';

export const AppCheckbox = Object.assign(AppCheckboxRoot, {
  Indicator: AppCheckboxIndicator,
  Label: AppCheckboxLabel,
});
