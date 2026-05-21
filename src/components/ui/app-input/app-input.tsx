/**
 * AppInput — compound field (Pencil / design tokens). Pass `isInvalid`, `isDisabled`, etc. on `AppInput.Group`.
 *
 * @example
 * <AppInput>
 *   <AppInput.Label>Amount</AppInput.Label>
 *   <AppInput.Group isInvalid={hasError}>
 *     <AppInput.Slot name="currency-dollar" />
 *     <AppInput.Field placeholder="0.00" />
 *   </AppInput.Group>
 *   <AppInput.HelperText variant={hasError ? 'error' : 'default'}>Hint</AppInput.HelperText>
 * </AppInput>
 *
 * @see specs/003-shared-ui-components/quickstart.md — Input
 */
import { type FC, type ReactNode } from 'react';

import { Pressable, Text, TextInput, View, type TextInputProps, type TextProps } from 'react-native';

import { createInput } from '@gluestack-ui/core/input/creator';
import { tva, useStyleContext, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import type { SvgProps } from 'react-native-svg';

import AlertCircleIcon from '@/assets/icons/alert-circle.svg';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CheckIcon from '@/assets/icons/check.svg';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import CurrencyDollarIcon from '@/assets/icons/currency-dollar.svg';
import FilterIcon from '@/assets/icons/filter-icon.svg';
import Mail01Icon from '@/assets/icons/mail-01.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import SortByIcon from '@/assets/icons/sort-by.svg';
import VectorIcon from '@/assets/icons/vector.svg';
import XCloseIcon from '@/assets/icons/x-close.svg';
import { withStates } from '@/lib/gluestack/with-states-interop';
import { pencilFocusRingClasses } from '@/lib/nativewind/pencil-focus-ring';

const ICON_MAP = {
  'alert-circle': AlertCircleIcon,
  'arrow-down': ArrowDownIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  'chevron-left': ChevronLeftIcon,
  'currency-dollar': CurrencyDollarIcon,
  'filter-icon': FilterIcon,
  'mail-01': Mail01Icon,
  plus: PlusIcon,
  'sort-by': SortByIcon,
  'x-close': XCloseIcon,
  vector: VectorIcon,
} as const satisfies Record<string, FC<SvgProps>>;

export type IconName = keyof typeof ICON_MAP;

// ---------------------------------------------------------------------------
// Style context scope
// ---------------------------------------------------------------------------

const INPUT_SCOPE = 'APP_INPUT';

type AppInputStyleContext = {
  isInvalid: boolean;
  isDisabled: boolean;
};

function useAppInputStyle(): AppInputStyleContext {
  const ctx = useStyleContext(INPUT_SCOPE) as AppInputStyleContext | undefined;
  return ctx ?? { isInvalid: false, isDisabled: false };
}

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const StyledGroup = withStates(withStyleContext(View, INPUT_SCOPE));
const StyledField = withStates(withStyleContext(TextInput, INPUT_SCOPE));
const StyledSlot = withStates(withStyleContext(Pressable, INPUT_SCOPE));
const StyledIcon = withStates(View);

const UIInput = createInput({
  Root: StyledGroup,
  Icon: StyledIcon,
  Slot: StyledSlot,
  Input: StyledField,
});

cssInterop(UIInput, { className: 'style' } as any);
cssInterop(UIInput.Input, { className: 'style' } as any);
cssInterop(UIInput.Slot, { className: 'style' } as any);
cssInterop(UIInput.Icon, { className: 'style' } as any);

// ---------------------------------------------------------------------------
// Variants — Pencil node QxrgC
// ---------------------------------------------------------------------------

export const appInputGroupVariants = tva({
  base: [
    'h-[54px] rounded-lg bg-neutral-800 border border-neutral-500 px-4 items-center gap-3 flex flex-row',
    'data-[focus=true]:border-orange-400',
    'data-[invalid=true]:border-destructive',
    'data-[disabled=true]:opacity-50',
    pencilFocusRingClasses,
  ].join(' '),
});

export const appInputHelperTextVariants = tva({
  base: 'font-sans-medium text-body-sm',
  variants: {
    variant: {
      default: 'text-neutral-300',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const appInputLabelClassName = 'font-sans-medium text-body text-neutral-0';

export const appInputFieldClassName = 'font-sans-medium text-body text-neutral-0 flex-1 border-0 outline-none ring-0 shadow-none';

// ---------------------------------------------------------------------------
// Project-level compound component
// ---------------------------------------------------------------------------

type AppInputRootProps = Readonly<{
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
  children: ReactNode;
}>;

function AppInputRoot({ className, children }: AppInputRootProps) {
  return (
    <View className={['w-full gap-2.5', className].filter(Boolean).join(' ')}>
      {children}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

type AppInputLabelProps = TextProps & { className?: string };

function AppInputLabel({ className, ...props }: AppInputLabelProps) {
  const cls = [appInputLabelClassName, className].filter(Boolean).join(' ');
  return <Text {...props} className={cls} />;
}

type AppInputGroupProps = Readonly<{
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
  children: ReactNode;
}>;

function AppInputGroup({ isInvalid, isDisabled, isReadOnly, isRequired, className, children }: AppInputGroupProps) {
  const cls = appInputGroupVariants({ class: className });

  return (
    <UIInput
      context={{ isInvalid, isDisabled } satisfies AppInputStyleContext}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      className={cls}
    >
      {children}
    </UIInput>
  );
}

type AppInputFieldProps = Omit<TextInputProps, 'className'> & {
  className?: string;
};

function AppInputField({ className, ...props }: AppInputFieldProps) {
  const cls = [appInputFieldClassName, className].filter(Boolean).join(' ');

  return <UIInput.Input {...(props as any)} placeholderTextColor="#B7B7B7" className={cls} />;
}

type AppInputSlotProps = Readonly<{
  name: IconName;
  className?: string;
}>;

function AppInputSlot({ name, className }: AppInputSlotProps) {
  const Icon = ICON_MAP[name];

  return (
    <UIInput.Slot className={className}>
      <Icon width={20} height={20} color="#B7B7B7" />
    </UIInput.Slot>
  );
}

type AppInputHelperTextProps = TextProps & {
  variant?: 'default' | 'error';
  className?: string;
};

function AppInputHelperText({ variant = 'default', className, ...props }: AppInputHelperTextProps) {
  const { isInvalid } = useAppInputStyle();
  const effectiveVariant = isInvalid ? 'error' : variant;
  const cls = appInputHelperTextVariants({ variant: effectiveVariant, class: className });

  return (
    <View className="flex-row items-center gap-2">
      {effectiveVariant === 'error' && (
        <AlertCircleIcon width={16} height={16} color="#ef4444" />
      )}
      <Text {...props} className={cls} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppInputRoot.displayName = 'AppInput';
AppInputLabel.displayName = 'AppInput.Label';
AppInputGroup.displayName = 'AppInput.Group';
AppInputField.displayName = 'AppInput.Field';
AppInputSlot.displayName = 'AppInput.Slot';
AppInputHelperText.displayName = 'AppInput.HelperText';

export const AppInput = Object.assign(AppInputRoot, {
  Label: AppInputLabel,
  Group: AppInputGroup,
  Field: AppInputField,
  Slot: AppInputSlot,
  HelperText: AppInputHelperText,
});
