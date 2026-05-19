/**
 * AppButton — Pencil `app.pen` node UpBXR. Variants: `primary` | `secondary` | `tertiary`.
 * Label as string `children`; optional `AppButton.Spinner` when `isLoading`.
 *
 * @example
 * <AppButton variant="primary" onPress={handleSave}>Save Goal</AppButton>
 *
 * @see specs/003-shared-ui-components/quickstart.md — Button
 */
import { Children, isValidElement, type ReactNode } from 'react';

import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
} from 'react-native';

import { createButton } from '@gluestack-ui/core/button/creator';
import { tva, useStyleContext, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

import { withStates } from '@/lib/gluestack/with-states-interop';

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const BUTTON_SCOPE = 'APP_BUTTON';

const StyledRoot = withStates(withStyleContext(Pressable, BUTTON_SCOPE));
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

// ---------------------------------------------------------------------------
// Variants — Pencil node UpBXR (Primary / Secondary / Tertiary only)
// ---------------------------------------------------------------------------


export const appButtonRootVariants = tva({
  base: [
    'flex-row shrink-0 items-center justify-center rounded-full border border-transparent',
    'min-h-[48px] gap-2.5 py-3',
    'data-[disabled=true]:pointer-events-none',
    'data-[active=true]:opacity-80',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  variants: {
    variant: {
      primary: [
        'bg-orange-400 px-5',
        'data-[hover=true]:bg-primary',
        'data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]',
      ].join(' '),
      secondary: [
        'bg-neutral-800 border-secondary px-5',
        'data-[hover=true]:bg-neutral-700',
        'data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]',
      ].join(' '),
      tertiary: [
        'bg-transparent px-4',
        'data-[hover=true]:bg-neutral-800',
        'data-[focus-visible=true]:bg-neutral-900',
        'data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]',
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const appButtonTextVariants = tva({
  base: 'font-sans-medium text-body',
  variants: {
    variant: {
      primary: 'text-neutral-900',
      secondary: 'text-neutral-0 data-[disabled=true]:text-neutral-400',
      tertiary: 'text-neutral-0 data-[disabled=true]:text-neutral-400',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonVariant = NonNullable<Parameters<typeof appButtonRootVariants>[0]>['variant'];

type AppButtonStyleContext = {
  variant: ButtonVariant;
  isLoading: boolean;
};

function useAppButtonStyle(): AppButtonStyleContext {
  const ctx = useStyleContext(BUTTON_SCOPE) as AppButtonStyleContext | undefined;
  return (
    ctx ?? {
      variant: 'primary',
      isLoading: false,
    }
  );
}

// ---------------------------------------------------------------------------
// Children helpers
// ---------------------------------------------------------------------------

function isPrimitiveChild(child: ReactNode): child is string | number {
  return typeof child === 'string' || typeof child === 'number';
}

function normalizeButtonChildren(children: ReactNode): ReactNode {
  if (children == null) return children;

  if (isPrimitiveChild(children)) {
    return <AppButtonText>{children}</AppButtonText>;
  }

  return Children.map(children, (child, index) => {
    if (child == null || typeof child === 'boolean') return null;
    if (isPrimitiveChild(child)) {
      return (
        <AppButtonText key={`app-button-text-${index}`}>{child}</AppButtonText>
      );
    }
    if (isValidElement(child) && child.type === AppButtonText) {
      return child;
    }
    return child;
  });
}

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type AppButtonRootProps = Omit<PressableProps, 'children'> & {
  variant?: ButtonVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
};

function AppButtonRoot({
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  className,
  children,
  ...props
}: AppButtonRootProps) {
  const effectiveDisabled = isDisabled || isLoading;
  const cls = appButtonRootVariants({ variant, class: className });

  return (
    <UIButton
      {...(props as any)}
      context={{ variant, isLoading } satisfies AppButtonStyleContext}
      isDisabled={effectiveDisabled}
      className={cls}
    >
      {normalizeButtonChildren(children)}
    </UIButton>
  );
}

function AppButtonText({ className, ...props }: TextProps & { className?: string }) {
  const { variant } = useAppButtonStyle();
  const cls = appButtonTextVariants({ variant, class: className });
  return <UIButton.Text {...(props as any)} className={cls} />;
}

function getSpinnerColor(variant: ButtonVariant): string {
  return variant === 'primary' ? '#101010' : '#FFFFFF';
}

function AppButtonSpinner({
  className,
  color,
  ...props
}: Readonly<{
  className?: string;
  color?: string;
}>) {
  const { isLoading, variant } = useAppButtonStyle();
  if (!isLoading) return null;

  const spinnerColor = color ?? getSpinnerColor(variant);

  return (
    <UIButton.Spinner
      {...(props as any)}
      color={spinnerColor}
      className={className}
    />
  );
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppButtonRoot.displayName = 'AppButton';
AppButtonText.displayName = 'AppButton.Text';
AppButtonSpinner.displayName = 'AppButton.Spinner';

export const AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Spinner: AppButtonSpinner,
});
