import { type FC, type ReactNode, forwardRef } from 'react';

import { Pressable, Text, TextInput, View, type TextInputProps, type TextProps, type ViewProps } from 'react-native';

import type { SvgProps } from 'react-native-svg';

import { createInput } from '@gluestack-ui/core/input/creator';
import { cssInterop } from 'nativewind';

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
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const StyledRoot = withStates(View);

const PrimitiveIcon = forwardRef<View, ViewProps>(function PrimitiveIcon(props, ref) {
  return <View {...props} ref={ref} />;
});

const UIInput = createInput({
  Root: StyledRoot,
  Icon: PrimitiveIcon,
  Slot: Pressable,
  Input: TextInput,
});

cssInterop(UIInput, { className: 'style' } as any);
cssInterop(UIInput.Input, { className: 'style' } as any);
cssInterop(UIInput.Slot, { className: 'style' } as any);

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

function AppInputRoot({
  className,
  children,
}: AppInputRootProps) {
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
  const cls = ['font-sans-medium text-body text-neutral-0', className].filter(Boolean).join(' ');
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

function AppInputGroup({
  isInvalid,
  isDisabled,
  isReadOnly,
  isRequired,
  className,
  children,
}: AppInputGroupProps) {
  const cls = [
    'h-[54px] rounded-md bg-neutral-700 border border-neutral-500 px-4 items-center gap-3 flex flex-row',
    'data-[focus=true]:border-orange-400',
    'data-[invalid=true]:border-destructive',
    'data-[disabled=true]:opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <UIInput
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
  const cls = [
    'font-sans-medium text-body text-neutral-0 flex-1 border-0 outline-none ring-0 shadow-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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

type HelperTextVariant = 'default' | 'error';

type AppInputHelperTextProps = TextProps & {
  variant?: HelperTextVariant;
  className?: string;
};

function AppInputHelperText({ variant = 'default', className, ...props }: AppInputHelperTextProps) {
  const textCls = [
    'font-sans-medium text-body-sm',
    variant === 'error' ? 'text-destructive' : 'text-neutral-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View className="flex-row items-center gap-2">
      <Text {...props} className={textCls} />
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
